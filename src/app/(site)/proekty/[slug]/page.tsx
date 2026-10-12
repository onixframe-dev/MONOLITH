import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {Gallery} from '@/components/Gallery';
import {getPublishedProject,publishedProjects} from '@/lib/projects';
export const dynamicParams=false;
export function generateStaticParams(){return publishedProjects.map(project=>({slug:project.slug}))}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const p=getPublishedProject(params.slug);return {title:p?.title||'Проект не найден',description:p?.description}}
export default function ProjectPage({params}:{params:{slug:string}}){const project=getPublishedProject(params.slug);if(!project)notFound();return <><section className="detail-intro"><div className="container"><Link href="/proekty" className="back-link"><ArrowLeft size={16}/> Все проекты</Link><div className="detail-heading"><div><div className="section-kicker"><span>КОНЦЕПЦИЯ</span> / {project.style}</div><h1>{project.title}</h1><p>{project.subtitle}</p></div><span className="concept-chip">ДЕМОНСТРАЦИОННЫЙ ПРОЕКТ</span></div></div></section><div className="container detail-gallery-wrap"><Gallery images={project.gallery}/></div><section className="section project-description"><div className="container detail-bottom"><div><span className="section-kicker">ИДЕЯ ПРОЕКТА</span><h2>ПРОСТРАНСТВО<br/><em>СО СВОЕЙ ИСТОРИЕЙ</em></h2></div><div><p>{project.description}</p><p className="concept-disclaimer">Визуализации созданы для демонстрации дизайна сайта и не являются фотографиями реализованных работ. Точные размеры, стоимость и адрес для этого проекта не заявляются.</p><Link className="button button-primary" href="/kontakty#contact-form">Обсудить похожий интерьер <ArrowUpRight size={17}/></Link></div></div></section></>}
