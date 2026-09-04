import { NavLink, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import About from "../pages/About";
import Career from "../pages/Career";
import Projects from "../pages/Projects";

function App() {
	return (
		<div>
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
				<Routes>
					<Route
						path="/"
						element={<About />}
					/>
					<Route
						path="/career"
						element={<Career />}
					/>
					<Route
						path="/projects"
						element={<Projects />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
