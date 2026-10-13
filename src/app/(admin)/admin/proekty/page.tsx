import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { projects } from '@/lib/projects';
export default function AdminProjects() {
  return (
    <>
      <div className="admin-heading">
        <span className="admin-subtitle">CONTENT / PROJECTS</span>
        <h1>Проекты квартир</h1>
        <p>
          Модель публикации уже разделяет опубликованные проекты и черновики. Добавление,
          редактирование и удаление подключим через защищённые серверные действия.
        </p>
      </div>
      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Проект</th>
                <th>Категория</th>
                <th>Галерея</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="admin-proj-name">
                      <div className="admin-mini-img">
                        {p.cover && (
                          <OptimizedImage
                            src={p.cover}
                            alt=""
                            fill
                            sizes="54px"
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                      </div>
                      <div>
                        <strong>{p.title}</strong>
                        <small>/{p.slug}</small>
                      </div>
                    </div>
                  </td>
                  <td>{p.style}</td>
                  <td>{p.gallery.length} фотографий</td>
                  <td>
                    <span
                      className={
                        'admin-status ' + (p.status === 'PUBLISHED' ? 'is-published' : 'is-draft')
                      }
                    >
                      {p.status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
