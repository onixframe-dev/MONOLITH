'use client';
import { useState } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
export function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  return (
    <div className="review-form-shell">
      {sent ? (
        <div className="form-result" role="status">
          <strong>Отзыв подготовлен</strong>
          <p>
            В демо-версии данные не отправляются. После подключения API отзыв попадёт на модерацию в
            админ-панель.
          </p>
          <button onClick={() => setSent(false)} type="button">
            Написать другой
          </button>
        </div>
      ) : (
        <form
          className="review-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (consent) setSent(true);
          }}
        >
          <Input label="Ваше имя" required minLength={2} maxLength={80} placeholder="Имя" />
          <div className="rating-field">
            <span>Ваша оценка</span>
            <div>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  aria-label={'Оценка ' + n}
                  aria-pressed={rating === n}
                  type="button"
                  onClick={() => setRating(n)}
                >
                  <Star size={22} fill={n <= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>
          <Textarea
            label="Ваш отзыв"
            required
            minLength={10}
            maxLength={1600}
            rows={5}
            placeholder="Расскажите о вашем опыте..."
          />
          <Checkbox
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="form-consent"
          >
            <span>
              Согласен(на) с{' '}
              <Link href="/politika-konfidencialnosti">политикой обработки данных</Link>.
            </span>
          </Checkbox>
          <Button type="submit" variant="primary">
            Подготовить отзыв <ArrowUpRight size={17} />
          </Button>
          <small className="form-demo-note">Демонстрационная форма, без отправки.</small>
        </form>
      )}
    </div>
  );
}
