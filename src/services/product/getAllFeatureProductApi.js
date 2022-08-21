import http from "../../utils/http";

const getAllFeaturedProductApi = async (props) => {
  const { page = 1, page_size = 25 } = props || {};
  const productResponse = await http.get("/products/", {
    params: {
      page,
      page_size,
      is_feature: true,
    },
  });
  return productResponse.data;
};

export default getAllFeaturedProductApi;
