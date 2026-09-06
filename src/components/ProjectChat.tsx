import { LuArrowUp, LuSparkles } from "react-icons/lu";
import styles from "./ProjectChat.module.css";
import type { Project, ProjectDetail } from "../entity/project/model/project";
import { useState } from "react";

interface ChatMessage {
	role: "user" | "model";
	text: string;
}

interface ProjectChatProps {
	project: Project | null;
}

function buildSystemContext(project: Project | null): string {
	if (!project) return "";

	let detail: ProjectDetail | null = null;
	try {
		detail = JSON.parse(project.summary);
	} catch {
		detail = null;
	}

	return [
		`너는 개발자 포트폴리오 사이트의 프로젝트 소개 챗봇이야.`,
		`아래는 "${project.title}" 프로젝트 정보야. 이걸 바탕으로 질문에 한국어로 친절하게 답해줘.`,
		detail?.overview ? `개요: ${detail.overview}` : null,
		detail?.period ? `기간: ${detail.period}` : null,
		detail?.teamSize ? `팀 규모: ${detail.teamSize}인` : null,
		detail?.tags?.length ? `기술 스택: ${detail.tags.join(", ")}` : null,
		project.repository_url ? `GitHub 저장소: ${project.repository_url}` : null,
		`위 정보에 없는 내용은 모른다고 솔직하게 답해.`,
	]
		.filter(Boolean)
		.join("\n");
}

export default function ProjectChat({ project }: ProjectChatProps) {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSend = async () => {
		const text = input.trim();
		if (!text || isLoading) return;

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
					systemContext: buildSystemContext(project),
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
				{messages.map((m, idx) => (
					<p
						key={idx}
						className={m.role === "user" ? styles.userMsg : styles.modelMsg}
					>
						{m.text}
					</p>
				))}
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
					placeholder="질문을 입력하세요"
				/>
				<button
					className={styles.sendButton}
					aria-label="전송"
					onClick={handleSend}
				>
					<LuArrowUp size={18} />
				</button>
			</div>
		</div>
	);
}
