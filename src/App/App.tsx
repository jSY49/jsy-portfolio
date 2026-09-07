import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import About from "../pages/About";
import Career from "../pages/Career";
import Projects from "../pages/Projects";
import { AnimatePresence, motion } from "framer-motion";

function App() {
	const location = useLocation();

	return (
		<div className={styles.page}>
			{/* header - 너비 확장 가능 하게 app 밖으로 분리 */}
			<header className={styles.header}>
				<div className={styles.header_left}>
					<span className={styles.header_logo} />
					<h1 className={styles.header_title}>JSY's Portfolio</h1>
				</div>
				<nav>
					<ul className={styles.header_nav}>
						<li className={styles.nav_item}>
							<NavLink
								to={"/"}
								replace
								className={({ isActive }) =>
									isActive
										? `${styles.nav_link} ${styles.nav_link_active}`
										: styles.nav_link
								}
							>
								About Me
							</NavLink>
						</li>
						<li className={styles.nav_item}>
							<NavLink
								to={"/projects"}
								replace
								className={({ isActive }) =>
									isActive
										? `${styles.nav_link} ${styles.nav_link_active}`
										: styles.nav_link
								}
							>
								Projects
							</NavLink>
						</li>
						<li className={styles.nav_item}>
							<NavLink
								to={"/career"}
								replace
								className={({ isActive }) =>
									isActive
										? `${styles.nav_link} ${styles.nav_link_active}`
										: styles.nav_link
								}
							>
								Career
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>

			<div className={styles.app}>
				{/* content */}
				{/* wait : 이전 페이지가 완전히 사라진 뒤 다음 페이지 나타나도록 함 (sync는 겹쳐서 ) */}
				<AnimatePresence mode="wait">
					<Routes
						location={location}
						key={location.pathname}
					>
						<Route
							path="/"
							element={
								<PageWrapper>
									<About />
								</PageWrapper>
							}
						/>
						<Route
							path="/career"
							element={
								<PageWrapper>
									<Career />
								</PageWrapper>
							}
						/>
						<Route
							path="/projects"
							element={
								<PageWrapper>
									<Projects />
								</PageWrapper>
							}
						/>
					</Routes>
				</AnimatePresence>
			</div>
		</div>
	);
}

function PageWrapper({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0, x: 12 }} //컴포넌트가 처음 마운트 될 때
			animate={{ opacity: 1, x: 0 }} //컴포넌트가 최종 도달할 상태
			exit={{ opacity: 0, x: -12 }} //컴포넌티가 언마운트 될 때
			transition={{ duration: 0.25, ease: "easeInOut" }} //지속 시간 , 가속-감속 옵션
		>
			{children}
		</motion.div>
	);
}

export default App;
