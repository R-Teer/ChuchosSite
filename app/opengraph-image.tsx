import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Chuchos | Authentic Mexican Street Food';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#e11d48',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: '1rem' }}>Chuchos</div>
        <div style={{ fontSize: 36, marginBottom: '2rem' }}>Authentic Mexican Street Food</div>
        <div style={{ fontSize: 24 }}>Woking, Surrey</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
