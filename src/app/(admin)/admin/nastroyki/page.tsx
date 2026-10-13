export default function AdminSettings() {
  return (
    <>
      <div className="admin-heading">
        <span className="admin-subtitle">SYSTEM / CONFIGURATION</span>
        <h1>Настройки</h1>
        <p>Подготовленные модули, которые будут управляться из защищённой панели.</p>
      </div>
      <div className="admin-settings">
        <article>
          <h2>Данные компании</h2>
          <p>Название, описание, контакты, график, юридические реквизиты.</p>
          <span>Ожидает подключения</span>
        </article>
        <article>
          <h2>SEO и страницы</h2>
          <p>Title, description, Open Graph, публикация блоков и страниц.</p>
          <span>Ожидает подключения</span>
        </article>
        <article>
          <h2>Роли сотрудников</h2>
          <p>OWNER, EDITOR, VIEWER, журнал событий и управление доступами.</p>
          <span>Ожидает подключения</span>
        </article>
        <article>
          <h2>Уведомления</h2>
          <p>Новые заявки по email/Telegram, сроки обработки и настройки рассылки.</p>
          <span>Ожидает подключения</span>
        </article>
      </div>
    </>
  );
}
