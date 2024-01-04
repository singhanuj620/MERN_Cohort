import mongoose from 'mongoose';
const { Schema } = mongoose;

const urlShortnerSchema = new Schema({
  longUrl: String,
  shortUrl: String,
  hits: Number
});

export const UrlShortner = mongoose.model('UrlShortner', urlShortnerSchema)