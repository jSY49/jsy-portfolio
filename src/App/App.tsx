import { Link, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import About from "../pages/About";
import Career from "../pages/Career";
import Projects from "../pages/Projects";

function App() {
	return (
		<div className={styles.app}>
			{/* header */}
			<header className={styles.header}>
				<h1 className={styles.header_title}> JSY's Portfolio</h1>
				<nav>
					<ul className={styles.header_nav}>
						<li className={styles.nav_item}>
							<Link to={"/"}>About Me</Link>
						</li>
						<li className={styles.nav_item}>
							<Link to={"/projects"}>Projects</Link>
						</li>
						<li className={styles.nav_item}>
							<Link to={"/career"}>Career</Link>
						</li>
					</ul>
				</nav>
			</header>

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
	);
}

export default App;
