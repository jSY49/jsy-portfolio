import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownModalProps {
	isOpen: boolean;
	onClose: () => void;
	filePath: string;
}

function MarkdownModal({ isOpen, onClose, filePath }: MarkdownModalProps) {
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
		<div onClick={onClose}>
			<div
				// 바깥 배경 클릭 시에만 닫히고, 모달 내용 클릭 시에는 안 닫히도록
				onClick={(e) => e.stopPropagation()}
			>
				<button onClick={onClose}>✕</button>
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
		</div>
	);
}

export default MarkdownModal;
