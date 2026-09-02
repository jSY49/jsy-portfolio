import { useQuery } from "@tanstack/react-query";
import getProjects from "../shared/api/getProjecs";

export default function Projects() {
	const {
		data: projects,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["projects"],
		queryFn: getProjects,
	});

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
					<li key={project.id}>{project.title}</li>
				))}
			</ul>
		</>
	);
}
