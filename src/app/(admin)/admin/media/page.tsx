import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { publishedProjects } from '@/lib/projects';
export default function AdminMedia() {
  return (
    <>
      <div className="admin-heading">
        <span className="admin-subtitle">ASSETS / MEDIA LIBRARY</span>
        <h1>Медиатека</h1>
        <p>
          Обложки и галереи подготовленных концепций. Загрузка и изменение alt-текстов будут
          доступны после подключения медиасервиса.
        </p>
      </div>
      <div className="admin-media-grid">
        {publishedProjects
          .flatMap((p) => p.gallery.map((g) => ({ ...g, project: p.title })))
          .map((g) => (
            <div key={g.src} className="admin-media-card">
              <div>
                <OptimizedImage
                  src={g.cardSrc || g.src}
                  alt={g.alt}
                  fill
                  sizes="220px"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span>
                {g.project} / {g.room}
              </span>
            </div>
          ))}
      </div>
    </>
  );
}
