import dbConnect from '../../utils/db';
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: String,
  description: String,
  lat: Number,
  lng: Number,
});

const Location = mongoose.models.Location || mongoose.model('Location', LocationSchema);

export default async function handler(req, res) {
  await dbConnect();

  await Location.deleteMany({});

  const locations = [
    {
      name: 'Δημαρχείο Αγρινίου',
      description: 'Ράμπα και ανελκυστήρας στην είσοδο.',
      lat: 38.6267,
      lng: 21.4121,
    },
    {
      name: 'Πλατεία Δημοκρατίας',
      description: 'Εύκολη πρόσβαση για αμαξίδια.',
      lat: 38.6251,
      lng: 21.4074,
    },
    {
      name: 'Γενικό Νοσοκομείο Αγρινίου',
      description: 'Πλήρως προσβάσιμο με WC ΑμεΑ.',
      lat: 38.6203,
      lng: 21.4127,
    },
    {
      name: 'ΚΤΕΛ Αιτωλοακαρνανίας',
      description: 'Ράμπες σε είσοδο και αποβάθρες.',
      lat: 38.6261,
      lng: 21.4156,
    },
    {
      name: 'Αρχαιολογικό Μουσείο Αγρινίου',
      description: 'Ανελκυστήρας, ράμπες και ακουστική ξενάγηση.',
      lat: 38.6234,
      lng: 21.4092,
    },
  ];

  await Location.insertMany(locations);
  res.status(200).json({ message: 'Sample data inserted' });
}
