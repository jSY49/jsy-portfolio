import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./MarkdownModal.module.css";
import { LuX } from "react-icons/lu";
import ProjectChat from "./ProjectChat";
import type { Project } from "../entity/project/model/project";
import rehypeRaw from "rehype-raw";

interface MarkdownModalProps {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
	filePath: string;
}

export default function MarkdownModal({
	project,
	isOpen,
	onClose,
	filePath,
}: MarkdownModalProps) {
	const [content, setContent] = useState("");
	const [loadedPath, setLoadedPath] = useState<string | null>(null); // 이전 내용 노출 안되도록
	useEffect(() => {
		if (isOpen) {
			fetch(filePath)
				.then((res) => res.text())
				.then((text) => {
					setContent(text);
					setLoadedPath(filePath);
				});
		}
	}, [isOpen, filePath]);

	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const isStale = loadedPath !== filePath;

	return (
		<div
			className={styles.overlay}
			onClick={onClose}
		>
			<div
				className={styles.modal}
				// 바깥 배경 클릭 시에만 닫히고, 모달 내용 클릭 시에는 안 닫히도록
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.modalHeader}>
					<h1 className={styles.modal_title}>{project?.title}</h1>
					<button
						className={styles.closeButton}
						onClick={onClose}
						aria-label="닫기"
					>
						<LuX size={16} />
					</button>
				</div>
				<hr className={styles.divider} />
				<div className={styles.modalBody}>
					{isStale ? (
						<p className={styles.loading_text}>불러오는 중...</p>
					) : (
						<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
					)}
				</div>

				<ProjectChat
					key={project?.id}
					project={project}
				/>
			</div>
		</div>
	);
}
