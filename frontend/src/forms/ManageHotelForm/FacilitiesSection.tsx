import { useFormContext } from "react-hook-form";

import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <>
      <h2 className="text-2xl font-bold">Facilities</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => (
          <label className="text-sm flex gap-1">
            <input
              key={facility._id}
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  return facilities && facilities.length > 0
                    ? true
                    : "At least one facility is required";
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </>
  );
};
export default FacilitiesSection;
