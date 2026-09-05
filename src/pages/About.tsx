import AboutInfo from "../components/AboutInfo";
import styles from "./About.module.css";
import birth from "../assets/icons/birth.svg";
import github from "../assets/icons/github.svg";
import mail from "../assets/icons/mail.svg";
import phone from "../assets/icons/phone.svg";
import pen from "../assets/icons/pen.svg";
import AboutSkill from "../components/AboutSkill";
import { TbCertificate } from "react-icons/tb";

export default function About() {
	return (
		<div className={styles.bg}>
			<section className={styles.top}>
				<div className={styles.about_profile}>
					{/* <p className={styles.title}>ABOUT ME</p> */}
					<div className={styles.about_profile_detail}>
						<img
							className={styles.about_profile_img}
							src="/profile.jpg"
							alt="프로필 사진"
						/>

						<div className={styles.about_info}>
							<div className={styles.about_summary}>
								<h1 className={styles.about_summary_name}>
									전승연
								</h1>
								<h4 className={styles.about_summary_job}>
									안드로이드{" "}
								</h4>
								<p className={styles.about_summary_desc}>
									설명
								</p>
							</div>

							<div className={styles.about_item}>
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
									value="github.com/jSY49"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.about_skills}>
					<h3 className={styles.title}>SKILLS</h3>
					<article className={styles.skill_section}>
						<AboutSkill />
					</article>
				</div>

				<div className={styles.about_certification}>
					<h3 className={styles.title}>CERTIFICATION</h3>
					<article className={styles.skill_section}>
						<article className={styles.certifi}>
							<div className={styles.corp_image_wrapper}>
								<TbCertificate
									className={styles.corp_image}
									color="#3b60e4"
								/>
							</div>
							<div className={styles.career_info}>
								<h3 className={styles.corp_name}>
									자격증 이름
								</h3>
								<p className={styles.corp_desc}>발급 기관</p>
								<p className={styles.period}>취득일</p>
								{/* <p className={styles.position}>자격증</p> */}
							</div>
						</article>
					</article>
				</div>
			</section>
		</div>
	);
}
