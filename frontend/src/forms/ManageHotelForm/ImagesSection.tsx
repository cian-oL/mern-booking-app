import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <>
      <h2 className="text-2xl font-bold">Images</h2>
      <div className="flex flex-col border rounded p-4 gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "At least one image is required.";
              }

              if (totalLength > 6) {
                return "Only a max of 6 images is allowed.";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </>
  );
};

export default ImagesSection;
