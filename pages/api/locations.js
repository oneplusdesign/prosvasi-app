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

  if (req.method === 'GET') {
    const locations = await Location.find();
    res.status(200).json(locations);
  }

  if (req.method === 'POST') {
    const newLoc = await Location.create(req.body);
    res.status(201).json(newLoc);
  }
}
