import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import About from "../pages/about/About";
import Career from "../pages/career/Career";
import Projects from "../pages/project/Projects";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../widgets/header/header";

function App() {
	const location = useLocation();

	return (
		<div className={styles.page}>
			{/* header - 너비 확장 가능 하게 app 밖으로 분리 */}
			<Header />

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
			style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				width: "100%",
			}} // .app의 flex 컨텍스트를 이어받아 자식의 align-self가 계속 동작하도록 함
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
