import { skillList } from "../data/skill/skills";
import styles from "./AboutSkill.module.css";

export default function AboutSkill() {
	return (
		<div className={styles.container}>
			{skillList.map((skill) => {
				const Icon = skill.icon;
				return (
					<div
						className={styles.skills}
						key={skill.type}
					>
						<div className={styles.skill_header}>
							<Icon
								className={styles.skill_image}
								color={skill.values[0].color}
							/>
							<h4 className={styles.skill_type}>{skill.type}</h4>
						</div>
						<ul className={styles.skill_list}>
							{skill.values.map((value) => (
								// TODO 스타일 적용
								<li
									className={styles.skill_item}
									key={value.text}
									style={{
										color: value.color
									}}
								>
									{value.text}
								</li>
							))}
						</ul>
					</div>
				);
			})}
		</div>
	);
}
