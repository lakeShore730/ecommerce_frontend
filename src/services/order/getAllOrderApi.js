import http from "../../utils/http";

const getAllOrder = async (props) => {
  const { page = 1, page_size = 25 } = props || {};
  const productResponse = await http.get("/orders/", {
    params: {
      page,
      page_size,
    },
  });
  return productResponse.data;
};

export default getAllOrder;
