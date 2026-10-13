'use client';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import type { LeadKind } from '@/types/content';
export function LeadForm({
  kind = 'CONSULTATION',
  compact = false,
}: {
  kind?: LeadKind;
  compact?: boolean;
}) {
  const [success, setSuccess] = useState(false);
  const [consent, setConsent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent || !name.trim() || !phone.trim()) return;
    setSuccess(true);
  }
  return (
    <form className={'lead-form ' + (compact ? 'lead-form--compact' : '')} onSubmit={submit}>
      {success ? (
        <div className="form-result" role="status">
          <CheckCircle2 size={24} />
          <div>
            <strong>Форма заполнена</strong>
            <p>
              Это демонстрация интерфейса. Ваши данные не отправлены и не сохранены. Отправку
              подключим вместе с защищённым сервером заявок.
            </p>
            <button type="button" onClick={() => setSuccess(false)}>
              Вернуться к форме
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="form-fields">
            <Input
              label="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              minLength={2}
              maxLength={80}
              required
            />
            <Input
              label="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+375 (__) ___-__-__"
              type="tel"
              minLength={7}
              maxLength={25}
              required
            />
            {!compact && (
              <Textarea
                label="Расскажите о проекте"
                hint="необязательно"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Площадь квартиры, пожелания, сроки..."
                className="form-field-wide"
                rows={3}
                maxLength={2000}
              />
            )}
          </div>
          <div className="form-end">
            <Checkbox
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="form-consent"
            >
              <span>
                Согласен(на) на обработку данных согласно{' '}
                <Link href="/politika-konfidencialnosti">политикой конфиденциальности</Link> и{' '}
                <Link href="/soglasie-na-obrabotku">условиям согласия</Link>.
              </span>
            </Checkbox>
            <Button variant="primary" type="submit">
              Подготовить заявку <ArrowUpRight size={17} />
            </Button>
          </div>
          <p className="form-demo-note">Режим дизайн-прототипа: заявки пока не отправляются.</p>
        </>
      )}
    </form>
  );
}
