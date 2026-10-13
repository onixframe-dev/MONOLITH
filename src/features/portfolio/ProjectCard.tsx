import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import type { Project } from '@/types/content';

export function ProjectCard({ project, number }: { project: Project; number: number }) {
  // Use the pre-cropped card version (850px wide) instead of master (1672px).
  // This cuts ~75% of bytes for each card in the catalog grid.
  const imageSrc = project.coverCard || project.cover;
  return (
    <Link
      href={'/proekty/' + project.slug}
      className="project-card"
      aria-label={'Открыть проект ' + project.title}
    >
      <div className="project-image">
        {imageSrc && (
          <OptimizedImage
            src={imageSrc}
            alt={'Интерьер ' + project.title}
            fill
            sizes="(max-width: 750px) 100vw, (max-width: 1100px) 50vw, 33vw"
            loading="lazy"
            decoding="async"
          />
        )}
        <span className="project-overline">КОНЦЕПЦИЯ 0{number}</span>
        <span className="project-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="project-card-info">
        <div>
          <span className="micro-label">{project.style}</span>
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
        <span className="project-card-n">/ 0{number}</span>
      </div>
    </Link>
  );
}
