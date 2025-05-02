// pages/admin/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const isAdmin = document.cookie.includes('admin=true');
    if (!isAdmin) {
      router.push('/admin-login');
      return;
    }
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const res = await fetch('/api/locations?admin=true');
    const data = await res.json();
    setLocations(data);
  };

  const total = locations.length;
  const approved = locations.filter(loc => loc.approved).length;
  const pending = total - approved;
  const byCategory = locations.reduce((acc, loc) => {
    acc[loc.category] = (acc[loc.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Στατιστικά Διαχειριστή</h2>
      <p><strong>Σύνολο Σημείων:</strong> {total}</p>
      <p><strong>Εγκεκριμένα:</strong> {approved}</p>
      <p><strong>Σε Αναμονή:</strong> {pending}</p>

      <h3>Κατηγορίες</h3>
      <ul>
        {Object.entries(byCategory).map(([cat, count]) => (
          <li key={cat}>{cat}: {count}</li>
        ))}
      </ul>

      <h3>Πρόσφατα Σημεία</h3>
      <ul>
        {locations.slice(0, 5).map(loc => (
          <li key={loc._id}>
            {loc.title} ({loc.category}) - {loc.approved ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}
