import { FormProvider, useForm } from "react-hook-form";

import DetailsSection from "./DetailsSection";
import HotelTypeSection from "./HotelTypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestNumberSection from "./GuestNumberSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
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
  imageFiles: FileList;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    formData.append("hotelName", formDataJson.hotelName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("rating", formDataJson.rating.toString());
    formData.append("hotelType", formDataJson.hotelType);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    console.log(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <HotelTypeSection />
        <FacilitiesSection />
        <GuestNumberSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-blue-600 font-bold p-2 hover:bg-blue-500 text-xl"
          >
            Add
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
