import http from "../../utils/http";

const getAllCategoryApi = async () => {
  const categoryRes = await http.get("/category/");
  return categoryRes.data;
};

export default getAllCategoryApi;
