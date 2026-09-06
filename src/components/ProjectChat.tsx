import { LuArrowUp, LuSparkles } from "react-icons/lu";
import styles from "./ProjectChat.module.css";
import type { Project, ProjectDetail } from "../entity/project/model/project";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import getGithubContext, {
	type GithubContext,
} from "../shared/api/getGithubContext";

interface ChatMessage {
	role: "user" | "model";
	text: string;
}

interface ProjectChatProps {
	project: Project | null;
}

function buildSystemContext(
	project: Project | null,
	githubContext: GithubContext | null | undefined,
): string {
	if (!project) return "";

	let detail: ProjectDetail | null = null;
	try {
		detail = JSON.parse(project.summary);
	} catch {
		detail = null;
	}

	return [
		`너는 개발자 포트폴리오 사이트에서, 이 개발자를 채용할지 검토 중인 채용 담당자의 질문에 답하는 챗봇이야.`,
		`아래는 "${project.title}" 프로젝트 정보야. 이 정보에 근거해서 합리적으로 추론하거나 설명을 덧붙여도 괜찮아 
		(예: 트러블슈팅 과정, 기술적 의사결정 이유, 배운 점 등). 
		다만 정보에 전혀 근거가 없는 사실(예: 연봉, 개인정보, 언급되지 않은 경력)은 절대 지어내지 말고, 
		그런 질문에는 모른다고 솔직히 답해.
		5문장 이내로 답해줘. `,
		detail?.overview ? `개요: ${detail.overview}` : null,
		detail?.period ? `기간: ${detail.period}` : null,
		detail?.teamSize ? `팀 규모: ${detail.teamSize}인` : null,
		detail?.tags?.length ? `기술 스택: ${detail.tags.join(", ")}` : null,
		project.repository_url ? `GitHub 저장소: ${project.repository_url}` : null,
		// GitHub에서 가져온 README/커밋 정보를 시스템 프롬프트 뒤에 이어붙임
		githubContext?.readme ? `\nREADME 내용:\n${githubContext.readme}` : null,
		githubContext?.commits?.length
			? `\n최근 커밋 목록:\n${githubContext.commits.map((c) => `- ${c}`).join("\n")}`
			: null,
	]
		.filter(Boolean)
		.join("\n");
}

export default function ProjectChat({ project }: ProjectChatProps) {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// project(repository_url)가 바뀔 때만 다시 불러오고, 같은 프로젝트면 30분간 캐시된 값을 재사용
	const { data: githubContext, isFetching: isGithubLoading } = useQuery({
		queryKey: ["github-context", project?.repository_url],
		queryFn: () => getGithubContext(project!.repository_url),
		enabled: !!project?.repository_url, // repository_url이 있을 때만 요청 실행
		staleTime: 1000 * 60 * 30,
	});

	const handleSend = async () => {
		const text = input.trim();
		// GitHub 정보가 아직 로딩 중이면 컨텍스트 없이 답하지 않도록 전송을 잠시 막음
		if (!text || isLoading || isGithubLoading) return;

		const nextMessages: ChatMessage[] = [...messages, { role: "user", text }];
		setMessages(nextMessages);
		setInput("");
		setIsLoading(true);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: nextMessages,
					systemContext: buildSystemContext(project, githubContext),
				}),
			});

			if (!res.ok) throw new Error("요청 실패");
			const data = await res.json();
			setMessages((prev) => [...prev, { role: "model", text: data.text }]);
		} catch (e) {
			console.error(e);
			setMessages((prev) => [
				...prev,
				{ role: "model", text: "죄송해요, 답변을 가져오지 못했어요." },
			]);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.header_icon}>
					<LuSparkles size={18} />
				</div>
				<h4 className={styles.header_title}>이 프로젝트에 대해 물어보기</h4>
			</div>
			<hr className={styles.divider} />

			<div className={styles.messages}>
				{messages.map((m, idx) =>
					m.role === "user" ? (
						<p key={idx} className={styles.userMsg}>
							{m.text}
						</p>
					) : (
						// 모델 답변은 마크다운(굵게, 목록, 줄바꿈 등)을 실제로 렌더링해서 보여줌
						<div key={idx} className={styles.modelMsg}>
							<ReactMarkdown>{m.text}</ReactMarkdown>
						</div>
					)
				)}
				{isLoading && <p className={styles.modelMsg}>생각하는 중...</p>}
			</div>

			<div className={styles.inputRow}>
				<input
					className={styles.input}
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleSend();
					}}
					placeholder={
						isGithubLoading
							? "GitHub 정보를 불러오는 중..."
							: "질문을 입력하세요"
					}
					disabled={isGithubLoading}
				/>
				<button
					className={styles.sendButton}
					aria-label="전송"
					onClick={handleSend}
					disabled={isGithubLoading}
				>
					<LuArrowUp size={18} />
				</button>
			</div>
		</div>
	);
}
