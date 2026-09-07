import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./MarkdownModal.module.css";
import { LuX } from "react-icons/lu";
import ProjectChat from "./ProjectChat";
import type { Project } from "../entity/project/model/project";
import rehypeRaw from "rehype-raw";
import getProjectBody from "../shared/api/getProjecBody";
import { useQuery } from "@tanstack/react-query";

interface MarkdownModalProps {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function MarkdownModal({
	project,
	isOpen,
	onClose,
}: MarkdownModalProps) {
	const {
		data: projectBody,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["project-detail", project?.slug],
		queryFn: () => getProjectBody(project!.slug),
		enabled: isOpen && !!project?.slug,
	});

	useEffect(() => {
		if (!isOpen) {
			document.body.style.overflow = ""; //스크롤 안되던거 해제
			return;
		}

		//esc 눌렀을 때 모달 off
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKeyDown);

		//모달 뒤로 화면 스크롤 안되도록
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className={styles.overlay}
			onClick={onClose}
		>
			<div
				className={styles.modal}
				// 바깥 배경 클릭 시에만 닫히고, 모달 내용 클릭 시에는 안 닫히도록 부모의 onclick이 자식에 전파되지 않도록 막아주는 것
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
					{isLoading ? (
						<p className={styles.loading_text}>불러오는 중...</p>
					) : error ? (
						<p className={styles.loading_text}>
							불러오지 못했어요: {(error as Error).message}
						</p>
					) : (
						<ReactMarkdown rehypePlugins={[rehypeRaw]}>
							{projectBody?.body ?? ""}
						</ReactMarkdown>
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
