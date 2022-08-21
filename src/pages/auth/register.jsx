import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Container from "../../components/ui/container";
import registerApi from "../../services/auth/register-api";

const validateRegisterData = (props) => {
  const { fullName, email, password, confirmPassword } = props;
  if (!fullName.trim().length) {
    return { isValidated: false, message: "Full name is required." };
  }
  if (!email.trim().length) {
    return { isValidated: false, message: "Email is required." };
  }
  if (!password.length) {
    return { isValidated: false, message: "Password is required." };
  }
  if (!confirmPassword.length) {
    return { isValidated: false, message: "Confirm password is required." };
  }
  if (password !== confirmPassword) {
    return {
      isValidated: false,
      message: "Password does not match with confirm password.",
    };
  }

  return { isValidated: true, message: "User data is verified." };
};

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;

    const { isValidated, message } = validateRegisterData({
      fullName,
      email,
      password,
      confirmPassword,
    });

    if (!isValidated) {
      toast.error(message);
      return;
    }

    setIsSubmitted(true);

    try {
      const registerResData = await registerApi({
        name: fullName,
        email,
        location: address,
        password,
      });

      toast.success("Please check the email to verify your account.");

      navigate("/register/verify-otp/", {
        state: { email: registerResData.email },
      });
    } catch (error) {
      const errorResponse = error.response.data;
      const keys = ["email", "name", "password"];

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

    setIsSubmitted(false);
  };

  return (
    <Container className="min-h-[80vh]">
      <div className="flex justify-center">
        <div className="w-full max-w-[500px] shadow p-5 mt-20 rounded-md">
          <p className="font-bold text-xl text-center text-gray-800 dark:text-white">
            Register
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm text-gray-700 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                className="border bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                className="border bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="address"
                className="block text-sm text-gray-700 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                className="border bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                className="border  bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="border bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="bg-primary text-white px-5 py-1 rounded-md"
                type="submit"
              >
                {isSubmitted ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
