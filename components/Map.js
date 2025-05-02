import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/api/locations')
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <MapContainer center={[38.6248, 21.4064]} zoom={14} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {locations.map((loc, i) => (
        <Marker key={i} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.name}</strong>
            <br />
            {loc.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
