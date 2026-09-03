import type { ProjectDetail } from "../entity/project/model/project";
import styles from "./ProjectItem.module.css";

export interface ProjectProps {
	title: string;
	summary: string;
	repository_url: string;
	onClick: () => void;
}

export default function ProjectItem({
	title,
	summary,
	repository_url,
	onClick,
}: ProjectProps) {
	let detail: ProjectDetail | null = null;
	try {
		detail = JSON.parse(summary);
	} catch (e) {
		console.error(`프로젝트(${title}) summary 파싱 실패:`, e);
	}

	return (
		<div
			className={styles.container}
			onClick={onClick}
		>
			<h4 className={styles.title}>{title}</h4>
			<p className={styles.period}>{detail?.period}</p>
			<p className={styles.teamsize}>{detail?.teamSize}</p>
			<hr />
			<p className={styles.overview}>{detail?.overview}</p>
			<p className={styles.url}>{repository_url}</p>
			<p className={styles.tags}>{detail?.tags}</p>
		</div>
	);
}
