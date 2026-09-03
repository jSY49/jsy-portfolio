import styles from "./Career.module.css";

export default function Career() {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>Career</h2>
			<article className={styles.career}>
				<div className={styles.corp_image_wrapper}>
					<img
						className={styles.corp_image}
						src=""
						alt=""
					/>
				</div>
				<div className={styles.career_info}>
					<h3 className={styles.corp_name}>회사 이름</h3>
					<p className={styles.period}>period~ n년 n개월</p>
					<p className={styles.corp_desc}>회사 간단 설명</p>
					<p className={styles.position}>담당 직무</p>

					<ul className={styles.task_list}>
						<li>담당 업무 내용 - 상세</li>
					</ul>

					<ul className={styles.tech_stack}>
						<li>사용 스택</li>
					</ul>
				</div>
			</article>

			<h2 className={styles.title}>Education</h2>
			<article className={styles.career}>
				<div className={styles.corp_image_wrapper}>
					<img
						className={styles.corp_image}
						src=""
						alt=""
					/>
				</div>
				<div className={styles.career_info}>
					<h3 className={styles.corp_name}>부트캠프/기관 이름</h3>
					<p className={styles.period}>period~ n년 n개월</p>
					<p className={styles.corp_desc}>과정 간단 설명</p>
					<p className={styles.position}>부트캠프</p>

					<ul className={styles.tech_stack}>
						<li>관련 스택</li>
					</ul>
				</div>
			</article>

			<article className={styles.career}>
				<div className={styles.corp_image_wrapper}>
					<img
						className={styles.corp_image}
						src=""
						alt=""
					/>
				</div>
				<div className={styles.career_info}>
					<h3 className={styles.corp_name}>자격증 이름</h3>
					<p className={styles.period}>취득일</p>
					<p className={styles.corp_desc}>발급 기관</p>
					<p className={styles.position}>자격증</p>
				</div>
			</article>
		</section>
	);
}