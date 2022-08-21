import http from "../../utils/http";

const verifyRegisterOtpApi = async (data) => {
  const registerUserResponse = await http.post(
    "/verify-register-user-otp/",
    data
  );
  return registerUserResponse.data;
};

export default verifyRegisterOtpApi;
