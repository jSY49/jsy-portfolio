export interface GithubContext {
	readme: string;
	commits: string[];
}

function parseGithubRepo(url: string): { owner: string; repo: string } | null {
	try {
		// new URL()로 문자열 링크를 host/path 등으로 쪼갬 (직접 문자열 파싱보다 안전)
		const { hostname, pathname } = new URL(url);
		if (!hostname.includes("github.com")) return null;

		// pathname은 "/owner/repo" 형태라 "/"로 나누면 [빈문자열, owner, repo] 순서가 됨
		const [, owner, repo] = pathname.split("/");
		if (!owner || !repo) return null;

		// repository_url이 "...repo.git"으로 끝나는 경우 대비해 ".git" 제거
		return { owner, repo: repo.replace(/\.git$/, "") };
	} catch {
		return null;
	}
}

// GitHub API가 내려주는 base64는 한글 같은 멀티바이트 문자가 깨질 수 있어서
// 바이트 배열로 바꾼 뒤 TextDecoder로 다시 UTF-8 문자열로 복원함
function decodeBase64Utf8(base64: string): string {
	const binary = atob(base64.replace(/\n/g, ""));
	const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
	return new TextDecoder("utf-8").decode(bytes);
}

export default async function getGithubContext(
	repositoryUrl: string,
): Promise<GithubContext | null> {
	const parsed = parseGithubRepo(repositoryUrl);
	if (!parsed) return null;

	const { owner, repo } = parsed;

	// Promise.all: 두 요청(README, 커밋 목록)을 동시에 보내서 순차 호출보다 빠르게 받음
	const [readmeRes, commitsRes] = await Promise.all([
		// 저장소마다 기본 브랜치명(main/master 등)이 달라서, raw 파일 경로 대신
		// GitHub API의 README 전용 엔드포인트를 사용 (브랜치 이름을 몰라도 항상 기본 브랜치의 README를 찾아줌)
		fetch(`https://api.github.com/repos/${owner}/${repo}/readme`),
		// GitHub REST API: 최근 커밋 10개를 최신순으로 조회
		fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`),
	]);

	// README가 없거나(404 등) 요청이 실패하면 빈 문자열로 처리 (챗봇이 죽지 않도록)
	let readme = "";
	if (readmeRes.ok) {
		const readmeJson = (await readmeRes.json()) as { content: string };
		// readme = decodeBase64Utf8(readmeJson.content).slice(0, 3000);
		readme = decodeBase64Utf8(readmeJson.content);
	}

	// 커밋 메시지는 여러 줄일 수 있어서 첫 줄(제목)만 추출해 토큰 절약
	const commits = commitsRes.ok
		? ((await commitsRes.json()) as { commit: { message: string } }[]).map(
				(c) => c.commit.message.split("\n")[0],
			)
		: [];

	return { readme, commits };
}
