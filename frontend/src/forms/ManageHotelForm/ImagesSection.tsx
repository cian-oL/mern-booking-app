import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  // convert existing cloudinary strings back into images for editing page
  const existingImageUrls = watch("imageUrls");

  return (
    <>
      <h2 className="text-2xl font-bold">Images</h2>
      <div className="flex flex-col border rounded p-4 gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
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
