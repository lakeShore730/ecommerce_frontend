import http from "../../utils/http";

const orderApi = async (data) => {
  const orderResponse = await http.post("/orders/", data);
  return orderResponse.data;
};

export default orderApi;
