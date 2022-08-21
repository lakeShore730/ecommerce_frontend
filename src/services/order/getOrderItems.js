import http from "../../utils/http";

const getOrderItemsApi = async (orderId) => {
  const orderResponse = await http.get(`/orders/${orderId}/`);
  return orderResponse.data;
};

export default getOrderItemsApi;
