// pages/map.js
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function MapPage() {
  return (
    <div>
      <h1 style={{ padding: '1rem' }}>Χάρτης Προσβασιμότητας</h1>
      <Map />
    </div>
  );
}
