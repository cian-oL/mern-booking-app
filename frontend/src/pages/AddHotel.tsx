import { useMutation } from "react-query";

import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: async () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
    },
    onError: async () => {
      showToast({ message: "Error saving hotel", type: "FAILURE" });
    },
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
