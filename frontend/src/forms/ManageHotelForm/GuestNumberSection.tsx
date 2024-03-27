import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";

const GuestNumberSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <>
      <h2 className="text-2xl font-bold">Guests</h2>
      <div className="flex justify-around bg-gray-300">
        <div className="w-2/5 p-3">
          <label className="text-sm flex flex-col mt-1">
            <span className="text-gray-700">Adults</span>
            <input
              type="number"
              className="border rounded w-full py-1 px-2 font-normal text-xs"
              placeholder="1"
              min={1}
              {...register("adultCount", {
                required: "At least one adult is required",
              })}
            />
          </label>
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        <div className="w-2/5 p-3">
          <label className="text-sm flex flex-col mt-1">
            <span className="text-gray-700">Children</span>
            <input
              type="number"
              className="border rounded w-full py-1 px-2 font-normal text-xs"
              placeholder="0"
              {...register("childCount", { required: "This is required" })}
            />
          </label>
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default GuestNumberSection;
