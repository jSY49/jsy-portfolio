import { LuArrowUp, LuSparkles } from "react-icons/lu";
import styles from "./ProjectChat.module.css";

export default function ProjectChat() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.header_icon}>
					<LuSparkles size={18} />
				</div>
				<h4 className={styles.header_title}>이 프로젝트에 대해 물어보기</h4>
			</div>
			<hr className={styles.divider} />

			<div className={styles.messages} />

			<div className={styles.inputRow}>
				<input
					className={styles.input}
					type="text"
				/>
				<button
					className={styles.sendButton}
					aria-label="전송"
				>
					<LuArrowUp size={18} />
				</button>
			</div>
		</div>
	);
}
