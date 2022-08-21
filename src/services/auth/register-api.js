import http from "../../utils/http";

const registerApi = async (data) => {
  const registerUserResponse = await http.post("/users/", data);
  return registerUserResponse.data;
};

export default registerApi;
