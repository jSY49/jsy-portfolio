import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
	return (
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
	);
}
