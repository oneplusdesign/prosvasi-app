import Link from 'next/link';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link href="/" style={{ marginRight: '1rem' }}>Αρχική</Link>
        <Link href="/map" style={{ marginRight: '1rem' }}>Χάρτης</Link>
        <Link href="/add">Προσθήκη Σημείου</Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
