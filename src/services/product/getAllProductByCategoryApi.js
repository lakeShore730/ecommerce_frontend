import http from "../../utils/http";

const getAllProductByCategoryApi = async (props) => {
  const { page = 1, page_size = 25, category = undefined } = props || {};
  const productResponse = await http.get("/products/", {
    params: {
      page,
      page_size,
      category,
    },
  });

  return productResponse.data;
};

export default getAllProductByCategoryApi;
