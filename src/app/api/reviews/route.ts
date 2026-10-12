import {NextResponse} from 'next/server';
export async function POST(){return NextResponse.json({code:'INTEGRATION_REQUIRED',message:'Приём отзывов будет включён после подключения модерации, защиты форм и БД.'},{status:503});}
