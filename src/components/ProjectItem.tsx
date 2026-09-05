import { LuArrowRight } from "react-icons/lu";
import type { ProjectDetail } from "../entity/project/model/project";
import styles from "./ProjectItem.module.css";
import { FaGithub } from "react-icons/fa";

export interface ProjectProps {
  title: string;
  summary: string;
  repository_url: string;
  onClick: () => void;
}

export default function ProjectItem({ title, summary, repository_url, onClick }: ProjectProps) {
  let detail: ProjectDetail | null = null;
  try {
    detail = JSON.parse(summary);
  } catch (e) {
    console.error(`프로젝트(${title}) summary 파싱 실패:`, e);
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <img className={styles.project_main_img} src="/profile.jpg" alt="대표 이미지" />

      <h4 className={styles.title}>{title}</h4>
      <p className={styles.meta}>
        {detail?.period}
        {detail?.teamSize ? ` • ${detail.teamSize}인 팀` : null}
      </p>
      <p className={styles.overview}>{detail?.overview}</p>

      {detail?.tags && detail.tags.length > 0 && (
        <ul className={styles.tags}>
          {detail.tags.map((tag) => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <hr className={styles.divider} />

      <div className={styles.footer}>
        {repository_url && (
          <a
            className={styles.url}
            href={repository_url}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className={styles.link_icon} />
            {repository_url}
          </a>
        )}

        <span className={styles.detail_link}>
          자세히
          <LuArrowRight />
        </span>
      </div>
    </div>
  );
}
