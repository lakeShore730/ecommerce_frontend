import http from "../../utils/http";

const getAllLatestProductApi = async (props) => {
  const { page = 1, page_size = 25 } = props || {};
  const productResponse = await http.get("/products/", {
    params: {
      page,
      page_size,
      is_feature: false,
    },
  });

  return productResponse.data;
};

export default getAllLatestProductApi;
