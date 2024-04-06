import { useFormContext } from "react-hook-form";

import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const HotelTypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("hotelType");

  return (
    <>
      <h2 className="text-2xl font-bold">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((hotelType, index) => (
          <label
            key={index}
            className={
              typeWatch === hotelType
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-0 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-0 font-semibold"
            }
          >
            <input
              key={index}
              type="radio"
              value={hotelType}
              className="hidden"
              {...register("hotelType", { required: "This is required" })}
            />
            <span>{hotelType}</span>
          </label>
        ))}
      </div>
      {errors.hotelType && (
        <span className="text-red-500 text-sm font-bold">
          {errors.hotelType.message}
        </span>
      )}
    </>
  );
};

export default HotelTypeSection;
