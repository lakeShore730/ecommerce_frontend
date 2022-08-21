import http from "../../utils/http";

const updateUserApi = async (props) => {
  const { userId, data } = props;
  const userResponse = await http.patch(`/users/${userId}/`, data);
  return userResponse.data;
};

export default updateUserApi;
