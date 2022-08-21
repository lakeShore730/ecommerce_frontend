import http from "../../utils/http";

const searchProductApi = async (props) => {
  const {
    page = 1,
    page_size = 25,
    category = undefined,
    query = undefined,
  } = props || {};
  const productResponse = await http.get("/products/", {
    params: {
      page,
      page_size,
      category,
      query,
    },
  });

  return productResponse.data;
};

export default searchProductApi;
