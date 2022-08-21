import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Container from "../../components/ui/container";
import verifyRegisterOtpApi from "../../services/auth/verify-register-otp-api";

const verifyOtp = (otp) => {
  if (!otp.trim().length) {
    return { isVerified: false, message: "OTP is required." };
  }
  if (otp.length !== 6) {
    return {
      isVerified: false,
      message: "OTP number should be six digit number.",
    };
  }
  return {
    isVerified: true,
    message: "OTP is verified.",
  };
};

const VerifyRegisterOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otp, setOtp] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!state.email) navigate("/register");
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;

    const { isVerified, message } = verifyOtp(otp);
    if (!isVerified) {
      toast.error(message);
      return;
    }

    setIsSubmitted(true);

    try {
      await verifyRegisterOtpApi({
        email: state.email,
        otp,
      });

      toast.success("Your account is successfully verified.");
      setIsSubmitted(false);
      navigate("/login");
    } catch (error) {
      setIsSubmitted(false);
      const errorResponse = error.response.data;
      const keys = ["email", "otp"];

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (errorResponse.hasOwnProperty(key)) {
          toast.error(errorResponse[key][0]);
          return;
        }
      }

      if (errorResponse.hasOwnProperty("detail")) {
        toast.error(errorResponse.detail);
        return;
      }

      toast.error("Something went wrong!");
    }
  };

  return (
    <Container className="min-h-[80vh]">
      <div className="flex justify-center">
        <form
          className="w-full max-w-[500px] shadow p-5 mt-20 rounded-md"
          onSubmit={handleSubmit}
        >
          <p className="font-bold text-xl text-center text-gray-800 dark:text-white">
            Register
          </p>
          <div className="mt-5">
            <label
              htmlFor="full-name"
              className="block text-sm text-gray-700 dark:text-white"
            >
              OTP
            </label>
            <input
              type="text"
              className="border bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
              value={otp}
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(value)) setOtp(value);
              }}
            />
            <div className="flex justify-end mt-5">
              <button
                className="bg-primary text-white px-5 py-1 rounded-md"
                type="submit"
              >
                {isSubmitted ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default VerifyRegisterOtp;
