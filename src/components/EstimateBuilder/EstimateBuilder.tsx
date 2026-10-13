'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Ruler} from 'lucide-react';
export function EstimateBuilder(){
 const [area,setArea]=useState(75);
 const [work,setWork]=useState('Дизайн-проект');
 const [style,setStyle]=useState('Современный');
 return <div className="estimate-box" aria-label="Параметры будущего интерьера"><div className="estimate-head"><Ruler size={16}/><span>КОНФИГУРАТОР ЗАПРОСА</span></div><div className="estimate-controls"><label>Площадь квартиры <strong>{area} м²</strong><input type="range" min="30" max="180" step="5" value={area} onChange={e=>setArea(Number(e.target.value))}/><div className="estimate-range"><span>30 м²</span><span>180 м²</span></div></label><label>Тип работ<select value={work} onChange={e=>setWork(e.target.value)}><option>Дизайн-проект</option><option>Ремонт под ключ</option><option>Дизайн + ремонт</option></select></label><label>Предпочитаемый стиль<select value={style} onChange={e=>setStyle(e.target.value)}><option>Современный</option><option>Минимализм</option><option>Скандинавский</option><option>Современная классика</option><option>Пока не определился</option></select></label></div><div className="estimate-summary"><span>Ваш запрос</span><strong>{area} м² · {work}</strong><small>{style}. Стоимость рассчитывается индивидуально после обсуждения задач. Здесь не используются вымышленные тарифы.</small><Link className="button button-primary" href="/kontakty#contact-form">Обсудить расчёт <ArrowUpRight size={16}/></Link></div></div>
}
