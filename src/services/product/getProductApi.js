import http from "../../utils/http";

const getProductApi = async (id) => {
  const productResponse = await http.get(`/products/${id}`);
  return productResponse.data;
};

export default getProductApi;
