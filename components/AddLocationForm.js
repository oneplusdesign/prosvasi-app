'use client';
import { useState } from 'react';
import { useRoleGuard } from '@/utils/authGuard';

export default function AddLocationForm() {
  useRoleGuard(['admin', 'user']);
  const [form, setForm] = useState({ name: '', description: '', lat: '', lng: '' });
  const [message, setMessage] = useState('');
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lat: parseFloat(form.lat), lng: parseFloat(form.lng) })
      });
      const data = await res.json();
      setMessage(data.message || 'Υποβλήθηκε!');
    } catch (err) {
      setMessage('Σφάλμα κατά την υποβολή.');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Προσθήκη Σημείου Προσβασιμότητας</h2>
      <input type="text" name="name" placeholder="Όνομα Σημείου" value={form.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
      <textarea name="description" placeholder="Περιγραφή" value={form.description} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required></textarea>
      <input type="text" name="lat" placeholder="Γεωγρ. Πλάτος (lat)" value={form.lat} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
      <input type="text" name="lng" placeholder="Γεωγρ. Μήκος (lng)" value={form.lng} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Υποβολή</button>
      {message && <p className="mt-4 text-green-700">{message}</p>}
    </form>
  );
}