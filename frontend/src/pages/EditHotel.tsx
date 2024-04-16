import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data } = useQuery(
    "getOneHotelById",
    () => apiClient.getOneHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
      onError: () => {},
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateOneHotelById, {
    onSuccess: async () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
    },
    onError: async () => {
      showToast({ message: "Error saving hotel", type: "FAILURE" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={data} onSave={handleSave} isLoading={isLoading} />
  );
};
export default EditHotel;
