import type { Metadata } from 'next';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { ProjectCatalog } from '@/features/portfolio';
export const metadata: Metadata = {
  title: 'Проекты квартир',
  description:
    'Концепции интерьеров MONOLITH: современные, скандинавские и контрастные пространства.',
};
export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero page-hero-photo">
        <OptimizedImage
          src="/images/hero/hero-bright.webp"
          alt="Современная светлая квартира"
          fill
          priority
          sizes="100vw"
          decoding="async"
        />
        <div className="container page-hero-content">
          <div className="section-kicker">
            <span>ПОРТФОЛИО</span> / КОНЦЕПТУАЛЬНЫЕ ПРОЕКТЫ
          </div>
          <h1>
            ПРОСТРАНСТВА
            <br />
            <em>ДЛЯ ЖИЗНИ</em>
          </h1>
          <p>Каждый интерьер со своим характером. Посмотрите разные подходы к дизайну квартиры.</p>
        </div>
      </section>
      <section className="section catalog-section">
        <div className="container">
          <div className="catalog-intro">
            <h2>
              ВЫБЕРИТЕ СВОЮ <em>АТМОСФЕРУ</em>
            </h2>
            <p>
              На сайте представлены демонстрационные AI-концепции. Новые проекты появятся после
              подготовки полноразмерных фотографий.
            </p>
          </div>
          <ProjectCatalog />
        </div>
      </section>
    </>
  );
}
