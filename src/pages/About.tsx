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
            <img className={styles.about_profile_img} src="/profile.jpg" alt="프로필 사진" />

            <div className={styles.about_info}>
              <div className={styles.about_summary}>
                <h1 className={styles.about_summary_name}>전승연</h1>
                <h4 className={styles.about_summary_job}>안드로이드 개발자</h4>
                <p className={styles.about_summary_desc}>
                  사용자의 불편을 줄이기 위해 노력하는 안드로이드 개발자입니다. <br />
                  <br /> 아티스트별 상용 앱 17개를 직접 개발하였고, 이를 포함한 48개 앱의 유지보수를
                  담당했습니다.
                  <br />
                  BLE 기반 디바이스 제어 앱을 공연장 내·외부에서 직접 테스트를 진행하며, 실사용자
                  피드백을 반영해 오류 개선과 통신 안정화를 이어왔습니다.
                </p>
              </div>

              <div className={styles.about_item}>
                <AboutInfo src={birth} type="생년월일" value="1997.04.09" />

                <AboutInfo src={pen} type="학력" value="소프트웨어응용 전공" />

                <AboutInfo src={phone} type="연락처" value="010-0000-0000" />

                <AboutInfo src={mail} type="이메일" value="jseung49@gmail.com" />

                <AboutInfo src={github} type="Git Hub" value="github.com/jSY49" />
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
                <TbCertificate className={styles.corp_image} color="#3b60e4" />
              </div>
              <div className={styles.career_info}>
                <h3 className={styles.corp_name}>정보처리기사</h3>
                <p className={styles.corp_desc}>한국산업인력공단</p>
                <p className={styles.period}>2022.06</p>
                {/* <p className={styles.position}>자격증</p> */}
              </div>
            </article>
          </article>
        </div>
      </section>
    </div>
  );
}
