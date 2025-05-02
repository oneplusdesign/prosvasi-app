import dbConnect from '../../utils/db';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await dbConnect();
  const client = mongoose.connection;
  const collection = client.db.collection('locations');

  if (req.method === 'GET') {
    const locations = await collection.find({}).toArray();
    res.status(200).json(locations);
  } else if (req.method === 'POST') {
    const newLocation = req.body;
    await collection.insertOne(newLocation);
    res.status(201).json({ message: 'Location added' });
  } else {
    res.status(405).end();
  }
}
