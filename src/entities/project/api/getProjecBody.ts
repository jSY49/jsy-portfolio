import type { ProjectBody } from "../model/projectBody";
import { supabase } from "../../../shared/api/supabase";

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
