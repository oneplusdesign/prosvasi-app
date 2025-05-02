import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icons = {
  'Ράμπα': new L.Icon({ iconUrl: '/icons/ramp.png', iconSize: [32, 32] }),
  'Χώρος Στάθμευσης': new L.Icon({ iconUrl: '/icons/parking.png', iconSize: [32, 32] }),
  'Τουαλέτα ΑμεΑ': new L.Icon({ iconUrl: '/icons/toilet.png', iconSize: [32, 32] }),
  'Ανελκυστήρας': new L.Icon({ iconUrl: '/icons/elevator.png', iconSize: [32, 32] }),
  'Διάβαση': new L.Icon({ iconUrl: '/icons/crosswalk.png', iconSize: [32, 32] }),
};

export default function MapView() {
  const [locations, setLocations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch('/api/locations');
      const data = await res.json();
      setLocations(data);
      setFiltered(data);
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const filtered = locations.filter(loc => {
      const matchesCategory = category ? loc.category === category : true;
      const matchesSearch = loc.title.toLowerCase().includes(search.toLowerCase()) ||
                            (loc.description || '').toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFiltered(filtered);
  }, [category, search, locations]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Χάρτης Σημείων Προσβασιμότητας</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Αναζήτηση..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Όλες οι κατηγορίες</option>
          <option>Ράμπα</option>
          <option>Χώρος Στάθμευσης</option>
          <option>Τουαλέτα ΑμεΑ</option>
          <option>Ανελκυστήρας</option>
          <option>Διάβαση</option>
        </select>
      </div>

      <MapContainer center={[38.6218, 21.4074]} zoom={15} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filtered.map((loc, idx) => (
          <Marker key={idx} position={[loc.coordinates.lat, loc.coordinates.lng]} icon={icons[loc.category] || icons['Ράμπα']}>
            <Popup>
              <strong>{loc.title}</strong><br />
              Κατηγορία: {loc.category}<br />
              {loc.description && <em>{loc.description}</em>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
