export interface Project {
	id: number;
	title: string;
	summary: string;
	repository_url: string;
	slug: string;
	created_at: string;
}

export interface ProjectDetail {
	overview: string;
	tags: string[];
	period: string;
	teamSize: number;
}
