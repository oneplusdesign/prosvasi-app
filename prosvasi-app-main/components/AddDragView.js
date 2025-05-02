'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultCenter = [38.6248, 21.4064];

export default function AddLocationDrag() {
  const [position, setPosition] = useState(defaultCenter);
  const [form, setForm] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(true);

    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return (
      <Marker
        draggable={draggable}
        eventHandlers={{
          dragend(e) {
            const { lat, lng } = e.target.getLatLng();
            setPosition([lat, lng]);
          },
        }}
        position={position}
      >
        <Popup>Σύρε τον δείκτη στη σωστή θέση</Popup>
      </Marker>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          lat: position[0],
          lng: position[1],
        }),
      });
      const data = await res.json();
      setMessage('✅ Το σημείο προστέθηκε!');
      setForm({ name: '', description: '' });
    } catch {
      setMessage('❌ Σφάλμα κατά την αποθήκευση');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold">Προσθήκη Σημείου με Drag & Drop</h2>
      <div className="w-full h-[60vh]">
        <MapContainer center={defaultCenter} zoom={14} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <DraggableMarker />
        </MapContainer>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
          placeholder="Όνομα Σημείου"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="p-2 border rounded"
          placeholder="Περιγραφή"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Αποθήκευση</button>
        {message && <p className="text-center mt-2 text-green-700">{message}</p>}
      </form>
    </div>
  );
}
