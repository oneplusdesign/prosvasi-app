import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div style={{ height: '90vh' }}>
      <Map />
    </div>
  );
}
