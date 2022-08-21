import http from "../../utils/http";

const getAllAdvertisementApi = async () => {
  const advertisementResponse = await http.get("advertisement");
  return advertisementResponse.data;
};

export default getAllAdvertisementApi;
