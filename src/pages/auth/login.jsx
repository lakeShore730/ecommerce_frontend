import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/slices/userSlice";
import Container from "../../components/ui/container";
import loginApi from "../../services/auth/login-api";
import { getErrorMessage } from "../../utils/utils";

const verifyLoginData = (props) => {
  const { email, password } = props;
  if (!email.trim().length) {
    return { isVerified: false, message: "Email is required." };
  }
  if (!password.length) {
    return { isVerified: false, message: "Password is required." };
  }
  return { isVerified: true, message: "Login data is verified." };
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isVerified, message } = verifyLoginData({ email, password });
    if (!isVerified) {
      toast.error(message);
      return;
    }

    setIsSubmitted(true);

    try {
      const loginResData = await loginApi({ email, password });
      console.log(loginResData);
      dispatch(setLogin({ ...loginResData, isRememberMe }));
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      const validatorKeys = ["email", "password"];
      const errorMessage = getErrorMessage(error, validatorKeys);
      toast.error(errorMessage);
    }

    setIsSubmitted(false);
  };

  return (
    <Container className="min-h-[80vh]">
      <div className="flex justify-center">
        <div className="w-full max-w-[500px] shadow p-5 mt-20 rounded-md">
          <p className="font-bold text-xl text-center text-gray-800 dark:text-white">
            Login
          </p>
          <form onSubmit={handleSubmit}>
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
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mt-5 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              className="border bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-5">
              <input
                type="radio"
                checked={isRememberMe}
                onChange={() => {}}
                onClick={() => setIsRememberMe(!isRememberMe)}
              />
              <label
                htmlFor="is-remember-me"
                className="text-sm text-gray-700 ml-2 mt-5 dark:text-white"
              >
                Remember me
              </label>
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="bg-primary text-white px-5 py-1 rounded-md"
                type="submit"
              >
                {isSubmitted ? "Logging In..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
