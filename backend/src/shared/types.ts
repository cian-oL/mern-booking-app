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
