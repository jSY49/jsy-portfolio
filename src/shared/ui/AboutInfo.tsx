import styles from "./AboutInfo.module.css";

interface AboutInfoProps {
	src: string;
	type: string;
	value: string;
	onClick?: () => void;
}

export default function AboutInfo({
	src,
	type,
	value,
	onClick,
}: AboutInfoProps) {
	return (
		<div
			className={`${styles.container} ${onClick ? styles.clickable : ""}`}
			onClick={onClick}
		>
			<div className={styles.img}>
				<img
					className={styles.icon}
					src={src}
				/>
			</div>
			<div className={styles.info}>
				<p className={styles.type}>{type}</p>
				<p className={styles.value}>{value}</p>
			</div>
		</div>
	);
}
