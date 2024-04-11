import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data } = useQuery("getAllHotels", apiClient.getAllHotels, {
    onError: () => {},
  });

  //   html to handle cases of hotelData being undefined
  if (!data) {
    return <span>No hotels found...</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {data.map((hotel, index) => (
          <div
            key={index}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-3xl font-bold">{hotel.hotelName}</h2>
            <p className="whitespace-pre-line">{hotel.description}</p>
            <div className="grid grid-cols-5 gap-2">
              <div className="flex items-center">
                <BsMap className="mr-1" />
                <span className="text-xs">
                  <p>{hotel.city}</p>
                  <p> {hotel.country}</p>
                </span>
              </div>
              <div className="flex items-center">
                <BsBuilding className="mr-1" />
                <span className="text-xs">{hotel.hotelType}</span>
              </div>
              <div className="flex items-center">
                <BiMoney className="mr-1" />
                <span className="text-xs">
                  €{hotel.pricePerNight} Per Night
                </span>
              </div>
              <div className="flex items-center">
                <BiHotel className="mr-1" />
                <span className="text-xs">
                  <p>{hotel.adultCount} Adults</p>
                  <p>{hotel.childCount} Children</p>
                </span>
              </div>
              <div className="flex items-center">
                <BiStar className="mr-1" />
                <span>{hotel.rating} Star Rating</span>
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyHotels;
