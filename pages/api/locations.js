// pages/api/locations.js
import dbConnect from '../../utils/db';

export default async function handler(req, res) {
  await dbConnect();

  // Εδώ πρόσθεσε την MongoDB λογική σου, π.χ. insert/find κλπ
  res.status(200).json({ message: 'Connected to MongoDB successfully!' });
}
