'use client';
import {useState} from 'react';
import {ArrowUpRight,CheckCircle2} from 'lucide-react';
import Link from 'next/link';
export function LeadForm({kind='CONSULTATION',compact=false}:{kind?:'CONSULTATION'|'ESTIMATE'|'CATALOG'|'GENERAL';compact?:boolean}){
 const [success,setSuccess]=useState(false);
 const [consent,setConsent]=useState(false);
 const [name,setName]=useState('');
 const [phone,setPhone]=useState('');
 const [message,setMessage]=useState('');
 function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(!consent||!name.trim()||!phone.trim())return;setSuccess(true);}
 return <form className={'lead-form '+(compact?'lead-form--compact':'')} onSubmit={submit}>
  {success?<div className="form-result" role="status"><CheckCircle2 size={24}/><div><strong>Форма заполнена</strong><p>Это демонстрация интерфейса. Ваши данные не отправлены и не сохранены. Отправку подключим вместе с защищённым сервером заявок.</p><button type="button" onClick={()=>setSuccess(false)}>Вернуться к форме</button></div></div>:<>
  <div className="form-fields"><label>Ваше имя<input value={name} onChange={e=>setName(e.target.value)} placeholder="Как к вам обращаться" minLength={2} maxLength={80} required/></label><label>Телефон<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+375 (__) ___-__-__" type="tel" minLength={7} maxLength={25} required/></label>{!compact&&<label className="form-field-wide">Расскажите о проекте <span>необязательно</span><textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Площадь квартиры, пожелания, сроки..." rows={3} maxLength={2000}/></label>}</div>
  <div className="form-end"><label className="form-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/><span>Согласен(на) на обработку данных согласно <Link href="/politika-konfidencialnosti">политике конфиденциальности</Link> и <Link href="/soglasie-na-obrabotku">условиям согласия</Link>.</span></label><button className="button button-primary" type="submit">Подготовить заявку <ArrowUpRight size={17}/></button></div><p className="form-demo-note">Режим дизайн-прототипа: заявки пока не отправляются.</p>
  </>}
 </form>;
}
