import { Link, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import About from "../pages/About";
import Career from "../pages/Career";
import Projects from "../pages/Projects";

function App() {
	return (
		<div className={styles.app}>
			{/* header */}
			<header>
				<h1 className={styles.header_title}> JSY's Portfolio</h1>

				<nav>
					<ul className={styles.header_nav}>
						<li>
							<Link to={"/"}>About Me</Link>
						</li>
						<li>
							<Link to={"/career"}>Career</Link>
						</li>
						<li>
							<Link to={"/projects"}>Projects</Link>
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
