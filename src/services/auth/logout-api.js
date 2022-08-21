import http from "../../utils/http";

const logoutApi = async () => {
  const loginResponse = await http.post("/logout/");
  return loginResponse.data;
};

export default logoutApi;
