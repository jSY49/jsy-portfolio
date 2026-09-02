import { useQuery } from "@tanstack/react-query";
import getProjects from "../shared/api/getProjecs";
import { useState } from "react";
import MarkdownModal from "../components/MarkdownModal";

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
		<>
			<ul>
				{projects?.map((project) => (
					<li
						key={project.id}
						onClick={() =>
							setSelectedProject(`/docs/${project.slug}.md`)
						}
					>
						{project.title}
					</li>
				))}
			</ul>

			<MarkdownModal
				isOpen={selectedProject !== null}
				onClose={() => setSelectedProject(null)}
				filePath={selectedProject ?? ""}
			/>
		</>
	);
}
