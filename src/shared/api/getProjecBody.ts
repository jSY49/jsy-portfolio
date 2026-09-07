import type { ProjectBody } from "../../entity/project/model/projectBody";
import { supabase } from "./supabase";

export default async function getProjectBody(
	slug: string,
): Promise<ProjectBody> {
	const { data, error } = await supabase
		.from("project-detail")
		.select("id,slug,body,created_at")
		.eq("slug", slug)
		.single();

	if (error) throw error;
	return data;
}
