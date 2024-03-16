import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal flex-1"
          {...register("hotelName", { required: "This field is required" })}
        />
        {errors.hotelName && (
          <span className="text-red-500">{errors.hotelName.message}</span>
        )}
      </label>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Country
          <input
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold">
        Description
        <textarea
          className="border rounded w-full py-1 px-2 font-normal flex-1"
          rows={10}
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price (€ per Night)
        <input
          className="border rounded w-full py-1 px-2 font-normal flex-1"
          type="number"
          min={1}
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Rating:
        <select
          className="border rounded w-full text-gray-700 text-sm font-normal"
          {...register("rating", {
            required: "Choose a star rating",
            min: 1,
          })}
        >
          <option value="">Choose a rating...</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}-star</option>
          ))}
        </select>
        {errors.rating && (
          <span className="text-red-500">{errors.rating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
