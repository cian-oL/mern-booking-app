import { FormProvider, useForm } from "react-hook-form";

import DetailsSection from "./DetailsSection";
import HotelTypeSection from "./HotelTypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestNumberSection from "./GuestNumberSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

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
  imageUrls: string[];
};

// declare the prop types accepted by the component
type Props = {
  hotel: HotelType;
  onSave: (formData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  // note that overlapping fields b/w hotel & HotelType makes this ok
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  // Need to use FormData Object to create a req.body with file data included
  const onSubmit = handleSubmit((hotelFormData) => {
    const formData = new FormData();
    formData.append("hotelName", hotelFormData.hotelName);
    formData.append("city", hotelFormData.city);
    formData.append("country", hotelFormData.country);
    formData.append("description", hotelFormData.description);
    formData.append("pricePerNight", hotelFormData.pricePerNight.toString());
    formData.append("rating", hotelFormData.rating.toString());
    formData.append("hotelType", hotelFormData.hotelType);
    formData.append("adultCount", hotelFormData.adultCount.toString());
    formData.append("childCount", hotelFormData.childCount.toString());

    hotelFormData.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(hotelFormData.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
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
            className="text-white bg-blue-600 font-bold p-2 hover:bg-blue-500 text-xl disabled:bg-orange-500"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Add"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
