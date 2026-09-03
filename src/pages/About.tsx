import AboutInfo from "../components/AboutInfo";
import styles from "./About.module.css";
import profile from "../assets/icons/profile.svg";
import birth from "../assets/icons/birth.svg";
import github from "../assets/icons/github.svg";
import mail from "../assets/icons/mail.svg";
import phone from "../assets/icons/phone.svg";
import pen from "../assets/icons/pen.svg";

export default function About() {
	return (
		<section className={styles.top}>
			<div className={styles.about_profile}>
				<h2 className={styles.title}>About Me</h2>
				<div className={styles.about_profile_detail}>
					<img
						className={styles.about_profile_img}
						src="/profile.jpg"
						alt="프로필 사진"
						width="200"
						height="200"
					/>
					<div className={styles.about_info}>
						<AboutInfo
							src={profile}
							type="이름"
							value="전승연"
						/>

						<AboutInfo
							src={birth}
							type="생년월일"
							value="1997.04.09"
						/>

						<AboutInfo
							src={pen}
							type="학력"
							value="소프트웨어응용 전공"
						/>

						<AboutInfo
							src={phone}
							type="연락처"
							value="010-0000-0000"
						/>

						<AboutInfo
							src={mail}
							type="이메일"
							value="jseung49@gmail.com"
						/>

						<AboutInfo
							src={github}
							type="Git Hub"
							value="https://github.com/jSY49"
						/>
					</div>
				</div>
			</div>

			<div className={styles.about_skills}>
				<h3 className={styles.about_skills_title}>Skills</h3>

				<article className={styles.skill_section}>
					<h4 className={styles.skill_type}>Language</h4>
					<ul className={styles.skill_list}>
						<li className={styles.skill_item}>Java</li>
						<li className={styles.skill_item}>Kotlin</li>
						<li className={styles.skill_item}>C#</li>
					</ul>
				</article>
			</div>
		</section>
	);
}
