import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import HotelTypeSection from "./HotelTypeSection";

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

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection />
        <HotelTypeSection />
      </form>
    </FormProvider>
  );
};
export default ManageHotelForm;
