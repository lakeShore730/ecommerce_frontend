import http from "../../utils/http";

const loginApi = async (data) => {
  const loginResponse = await http.post("/login/", data);
  return loginResponse.data;
};

export default loginApi;
