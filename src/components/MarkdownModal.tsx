import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles  from "./MarkdownModal.module.css";

interface MarkdownModalProps {
	isOpen: boolean;
	onClose: () => void;
	filePath: string;
}

export default function MarkdownModal({ isOpen, onClose, filePath }: MarkdownModalProps) {
	const [content, setContent] = useState("");

	useEffect(() => {
		if (isOpen) {
			fetch(filePath)
				.then((res) => res.text())
				.then((text) => setContent(text));
		}
	}, [isOpen, filePath]);

	if (!isOpen) return null;

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
					<button
						className={styles.closeButton}
						onClick={onClose}
					>
						✕
					</button>
				</div>
				<div className={styles.modalBody}>
					<ReactMarkdown>{content}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}
 
