import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";

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
      <form>
        <DetailsSection />
      </form>
    </FormProvider>
  );
};
export default ManageHotelForm;
