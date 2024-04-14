import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { data } = useQuery(
    "getOneHotelById",
    () => apiClient.getOneHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
      onError: () => {},
    }
  );

  return <ManageHotelForm hotel={data} />;
};
export default EditHotel;
