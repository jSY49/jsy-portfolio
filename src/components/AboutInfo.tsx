import styles from "./AboutInfo.module.css";

interface AboutInfoProps {
	src: string;
	type: string;
	value: string;
}

export default function AboutInfo({ src, type, value }: AboutInfoProps) {
	return (
		<div className={styles.container}>
			<div className={styles.img}>
				<img
					className={styles.icon}
                    src={src}
                    width={48}
				/>
			</div>
			<div className={styles.info}>
				<h3 className={styles.type}>{type}</h3>
				<p className={styles.value}>{value}</p>
			</div>
		</div>
	);
}
