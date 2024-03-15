import mongoose from "mongoose";

export type HotelType = {
  _id: string;
  userId: string;
  hotelName: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  rating: number;
  hotelType: string;
  facilities: string[];
  adultCount: number;
  childCount: number;
  imageUrls: string[];
  lastUpdated: Date;
};

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  hotelName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  hotelType: { type: String, required: true },
  facilities: [{ type: String, required: true }],
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;
