// pages/admin-login.js
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      document.cookie = 'admin=true; path=/';
      router.push('/admin');
    } else {
      setError('Λάθος στοιχεία πρόσβασης');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Σύνδεση Διαχειριστή</h2>
      <form onSubmit={handleLogin}>
        <label>
          Όνομα χρήστη:<br />
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label><br /><br />
        <label>
          Κωδικός:<br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label><br /><br />
        <button type="submit">Σύνδεση</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}
