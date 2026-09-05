import styles from "./Career.module.css";
import { LuBriefcase, LuGraduationCap } from "react-icons/lu";

export default function Career() {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>Career</h2>
			<article className={styles.career}>
				<div className={styles.corp_image_wrapper}>
					<LuBriefcase
						className={styles.corp_image}
						color="#3b60e4"
					/>
				</div>
				<div className={styles.career_info}>
					<h3 className={styles.corp_name}>팬라이트 (FANLIGHT)</h3>
					<p className={styles.period}>경력 2년 8개월</p>
					<p className={styles.corp_desc}>
						무선 LED 제어 기술을 활용한 응원봉 및 K-POP 굿즈 제작 회사
					</p>
					<p className={styles.position}>Android Developer</p>
					<ul className={styles.task_list}>
						<li>BLE 기반 응원봉 연동 안드로이드 앱 양산 개발 및 운영</li>
						<li>신규 프로젝트 앱 개발 및 출시 (총 17개 앱)</li>
						<li>운영 중인 상용 앱 48여 개 유지보수 및 안정화</li>
						<li>
							Rxjava와 Retrofit을 사용하여 REST API 통신 구현 및 서버 연동 코드
							리팩토링
						</li>
						<li>
							현장 사용 환경(공연장 내·외부)을 고려한 예외 처리 및 오류 대응
						</li>
						<li>앱 스토어 배포 및 운영 이슈 대응</li>
						<li>QA 시나리오 작성, 테스트 및 릴리즈 전·후 품질 관리 수행</li>
						<li>
							Java 기반 레거시 코드 리팩토링을 통해 구조 개선 및 유지보수성 향상
						</li>
						<li>
							신규 서비스 도입 검토를 위한 프로토타입 개발 (ML Kit 기반 OCR)
						</li>
					</ul>
					<ul className={styles.tech_stack}>
						<li>Java</li>
						<li>XML</li>
						<li>Kotlin</li>
						<li>RxJava</li>
						<li>BLE</li>
					</ul>
				</div>
			</article>

			<h2 className={styles.title}>Education</h2>
			<article className={styles.career}>
				<div className={styles.corp_image_wrapper}>
					<LuGraduationCap
						className={styles.corp_image}
						color="#3b60e4"
					/>
				</div>
				<div className={styles.career_info}>
					<h3 className={styles.corp_name}>현대오토에버 모빌리티 SW 스쿨</h3>
					<p className={styles.period}>2026.07 ~ 2026.12 (6개월)</p>
					<p className={styles.corp_desc}>
						한국전파진흥협회(RAPA)와 현대오토에버, 현대엔지비가 공동 운영하는
						채용연계형 SW 교육 과정으로, 웹/앱 분야 총 1,000시간 커리큘럼 수료
						(예정)
					</p>
					<p className={styles.position}>웹/앱 개발 과정</p>

					<ul className={styles.tech_stack}>
						<li>React</li>
						<li>TypeScript</li>
						<li>JavaScript</li>
						<li>Java</li>
						<li>spring boot</li>
					</ul>
				</div>
			</article>
		</section>
	);
}
