import { MessageSquare } from 'lucide-react';
export default function AdminReviews() {
  return (
    <>
      <div className="admin-heading">
        <span className="admin-subtitle">COMMUNITY / FEEDBACK</span>
        <h1>Отзывы</h1>
        <p>Очередь модерации и контроль опубликованных отзывов.</p>
      </div>
      <div className="admin-empty">
        <MessageSquare size={36} />
        <h2>Модерация отзывов ещё не подключена</h2>
        <p>
          После интеграции новые отзывы будут поступать со статусом PENDING. Публикация только после
          ручного подтверждения.
        </p>
      </div>
    </>
  );
}
