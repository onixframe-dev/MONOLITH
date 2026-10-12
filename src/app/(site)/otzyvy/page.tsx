import type {Metadata} from 'next';
import {ReviewForm} from '@/components/ReviewForm';
import {MessageSquareQuote} from 'lucide-react';
export const metadata:Metadata={title:'Отзывы клиентов'};
export default function ReviewsPage(){return <><section className="page-hero page-hero-simple"><div className="container"><span className="section-kicker">ОБРАТНАЯ СВЯЗЬ / ОТЗЫВЫ</span><h1>ВАШ ОПЫТ<br/><em>НАМ ВАЖЕН.</em></h1><p>Делимся впечатлениями и становимся лучше благодаря обратной связи.</p></div></section><section className="section"><div className="container review-page"><div className="reviews-empty"><MessageSquareQuote size={30}/><h2>ОТЗЫВЫ<br/><em>СКОРО ПОЯВЯТСЯ</em></h2><p>Мы не публикуем придуманные отзывы. После подключения защищённой админ-панели здесь будут показываться только подтверждённые и одобренные к публикации отклики.</p></div><div><div className="section-kicker">ВАШ ОТЗЫВ</div><h2>ПОДЕЛИТЕСЬ<br/><em>ВПЕЧАТЛЕНИЕМ</em></h2><ReviewForm/></div></div></section></>}
