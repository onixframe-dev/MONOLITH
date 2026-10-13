'use client';
import { useState } from 'react';
import { publishedProjects } from '@/lib/projects';
import { ProjectCard } from '@/features/portfolio';
const filters = ['Все', 'Современный', 'Скандинавский'];
export function ProjectCatalog() {
  const [filter, setFilter] = useState('Все');
  const list =
    filter === 'Все' ? publishedProjects : publishedProjects.filter((p) => p.category === filter);
  return (
    <>
      <div className="filters" role="group" aria-label="Фильтр по стилю">
        {filters.map((f) => (
          <button
            type="button"
            aria-pressed={filter === f}
            className={filter === f ? 'filter is-active' : 'filter'}
            onClick={() => setFilter(f)}
            key={f}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="projects-grid projects-grid--catalog">
        {list.map((p, i) => (
          <ProjectCard key={p.id} project={p} number={i + 1} />
        ))}
      </div>
      <p className="catalog-count">
        ПОКАЗАНО {list.length} ИЗ {publishedProjects.length} КОНЦЕПЦИЙ
      </p>
    </>
  );
}
