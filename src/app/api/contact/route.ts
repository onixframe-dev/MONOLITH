import {NextResponse} from 'next/server';
export async function POST(){return NextResponse.json({code:'INTEGRATION_REQUIRED',message:'Отправка заявок недоступна в дизайн-прототипе. Настройте авторизацию, антиспам и серверное хранение перед включением.'},{status:503});}
