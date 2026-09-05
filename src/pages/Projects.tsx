import { useQuery } from "@tanstack/react-query";
import getProjects from "../shared/api/getProjecs";
import { useState } from "react";
import MarkdownModal from "../components/MarkdownModal";
import styles from "./Projects.module.css";
import ProjectItem from "../components/ProjectItem";

export default function Projects() {
	const {
		data: projects,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["projects"],
		queryFn: getProjects,
	});

	const [selectedProject, setSelectedProject] = useState<string | null>(null);
	const [selectedProjectTitle, setSelectedProjectTitle] = useState<
		string | null
	>(null);

	if (isLoading) {
		return (
			<div className={styles.status_wrapper}>
				<div className={styles.spinner} />
				<p>불러오는 중...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.status_wrapper}>
				<p className={styles.error_text}>
					문제가 발생했어요: {(error as Error).message}
				</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>PROJECTS</h2>
			<p className={styles.sub}>
				카드를 누르면 프로젝트 README를 확인할 수 있습니다.
			</p>
			<div className={styles.items}>
				{projects?.map((project) => (
					<ProjectItem
						key={project.id}
						title={project.title}
						summary={project.summary}
						repository_url={project.repository_url}
						onClick={() => {
							setSelectedProject(`/docs/${project.slug}.md`);
							setSelectedProjectTitle(project.title);
						}}
					/>
				))}
			</div>
			<MarkdownModal
				title={selectedProjectTitle}
				isOpen={selectedProject !== null}
				onClose={() => {
					setSelectedProject(null);
					setSelectedProjectTitle(null);
				}}
				filePath={selectedProject ?? ""}
			/>
		</div>
	);
}
