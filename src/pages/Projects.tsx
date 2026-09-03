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

	if (isLoading) {
		return <p>불러오는 중</p>;
	}

	if (error) {
		return <p>ERROR : {(error as Error).message}</p>;
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Projects</h2>

			<div className = {styles.items}>
				{projects?.map((project) => (
					<ProjectItem
						key={project.id}
						title={project.title}
						summary={project.summary}
						repository_url={project.repository_url}
						onClick={() =>
							setSelectedProject(`/docs/${project.slug}.md`)
						}
					/>
				))}
			</div>
			<MarkdownModal
				isOpen={selectedProject !== null}
				onClose={() => setSelectedProject(null)}
				filePath={selectedProject ?? ""}
			/>
		</div>
	);
}
