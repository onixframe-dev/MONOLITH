'use client';
import Link from 'next/link';
import {ArrowUpRight, Menu, X, ArrowRight} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {mainNavigation} from '@/lib/site';
export function SiteHeader(){
 const [open,setOpen]=useState(false);
 const pathname=usePathname();
 useEffect(()=>{
  const header=document.querySelector<HTMLElement>('.site-header');
  if(!header) return;
  const update=()=>header.classList.toggle('site-header--scrolled',window.scrollY>12);
  update();
  window.addEventListener('scroll',update,{passive:true});
  return()=>window.removeEventListener('scroll',update);
 },[]);
 useEffect(()=>{
  const previous=document.body.style.overflow;
  if(open) document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous;};
 },[open]);
 useEffect(()=>{setOpen(false);},[pathname]);
 return <header className="site-header">
  <div className="container nav-inner">
   <Link href="/" aria-label="MONOLITH, на главную" className="brand-mark" onClick={()=>setOpen(false)}><span className="brand-logo">M<span className="brand-line">/</span></span><span className="brand-lockup"><b>MONOLITH</b><small>СТУДИЯ ИНТЕРЬЕРА</small></span></Link>
   <nav className={'header-links '+(open?'header-links--open':'')} aria-label="Основная навигация">
     {mainNavigation.map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className={pathname===l.href?'is-active':''}>{l.label}</Link>)}
     <Link href="/kontakty#contact-form" className="mobile-only nav-mobile-cta" onClick={()=>setOpen(false)}>Обсудить проект <ArrowRight size={15}/></Link>
   </nav>
   <div className="header-actions"><Link className="nav-cta" href="/kontakty#contact-form">Обсудить проект <ArrowUpRight size={15}/></Link><button className="menu-button" aria-expanded={open} aria-label={open?'Закрыть меню':'Открыть меню'} onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<Menu size={23}/>}</button></div>
  </div>
 </header>
}
