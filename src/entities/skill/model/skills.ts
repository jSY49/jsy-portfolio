import type { IconType } from "react-icons";
import {
	LuAppWindow,
	LuCode,
	LuGlobe,
	LuServer,
	LuWrench,
} from "react-icons/lu";
import { SiAndroid, SiApple, SiReact } from "react-icons/si";

// src/data/skills.ts
export interface SkillValue {
	text: string;
	color: string;
}

export interface SkillCategory {
	icon: IconType;
	type: string;
	values: SkillValue[];
}

export const skillList: SkillCategory[] = [
	{
		icon: LuCode,
		type: "Languages",
		values: [
			{ text: "Java", color: "#007396" },
			{ text: "Kotlin", color: "#7F52FF" },
			{ text: "C#", color: "#239120" },
			{ text: "TypeScript", color: "#3178C6" },
			{ text: "JavaScript", color: "#dfc91b" },
		],
	},
	{
		icon: SiAndroid,
		type: "Android",
		values: [
			{ text: "XML", color: "#0F9D58" },
			{ text: "Jetpack Compose", color: "#4285F4" },
			{ text: "RxJava", color: "#B7178C" },
			{ text: "Retrofit2", color: "#48B983" },
			{ text: "BLE", color: "#0082FC" },
			{ text: "Coroutines", color: "#7F52FF" },
			{ text: "Flow", color: "#4C8B46" },
		],
	},
	{
		icon: SiApple,
		type: "iOS",
		values: [
			{ text: "Swift", color: "#F05138" },
			// { text: "SwiftUI", color: "#0066CC" },
		],
	},
	{
		icon: SiReact,
		type: "Cross-platform",
		values: [{ text: "React Native", color: "#5ac9e8" }],
	},
	{
		icon: LuAppWindow,
		type: "Window",
		values: [
			{ text: "WPF", color: "#512BD4" },
			{ text: "Serial Communication", color: "#5C6BC0" },
		],
	},
	{
		icon: LuGlobe,
		type: "Frontend",
		values: [
			{ text: "HTML", color: "#E34F26" },
			{ text: "CSS", color: "#1572B6" },
			{ text: "React", color: "#5ac9e8" },
		],
	},
	{
		icon: LuServer,
		type: "Backend",
		values: [
			{ text: "Supabase", color: "#3ECF8E" },
			{ text: "Spring Boot", color: "#6DB33F" },
		],
	},
	{
		icon: LuWrench,
		type: "Tools",
		values: [
			{ text: "GitHub", color: "#181616" },
			{ text: "Git", color: "#F05032" },
			{ text: "Figma", color: "#F24E1E" },
			{ text: "Zeplin", color: "#FDBD39" },
		],
	},
];
