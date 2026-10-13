import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MONOLITH — дизайн интерьеров квартир';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'stretch',
        background: '#111311',
        color: '#f4f1eb',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        padding: '54px 66px 50px',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          background: '#d5ad82',
          height: 2,
          left: 66,
          position: 'absolute',
          top: 54,
          width: 88,
        }}
      />
      <div
        style={{
          border: '1px solid #4c4b45',
          height: 420,
          position: 'absolute',
          right: -92,
          top: 108,
          transform: 'rotate(-18deg)',
          width: 590,
        }}
      />
      <div
        style={{
          border: '1px solid #363832',
          height: 470,
          position: 'absolute',
          right: 14,
          top: 43,
          transform: 'rotate(-18deg)',
          width: 590,
        }}
      />
      <div
        style={{
          color: '#d5ad82',
          display: 'flex',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 4,
          marginTop: 28,
        }}
      >
        MONOLITH · СТУДИЯ ИНТЕРЬЕРА
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 84,
          fontWeight: 500,
          letterSpacing: -4,
          lineHeight: 0.95,
          marginTop: 94,
        }}
      >
        <span>АРХИТЕКТУРА</span>
        <span style={{ color: '#e2be9a' }}>ВАШИХ ПРИВЫЧЕК</span>
      </div>
      <div
        style={{
          color: '#c3c1ba',
          display: 'flex',
          fontSize: 25,
          lineHeight: 1.3,
          marginTop: 38,
          maxWidth: 630,
        }}
      >
        Создаём интерьеры, в которых удобно жить.
      </div>
      <div
        style={{
          color: '#8f908a',
          display: 'flex',
          fontSize: 16,
          letterSpacing: 2.8,
          marginTop: 'auto',
        }}
      >
        MONOLITH-CHI-THREE.VERCEL.APP
      </div>
    </div>,
    size,
  );
}
