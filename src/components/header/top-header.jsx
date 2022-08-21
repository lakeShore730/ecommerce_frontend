import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import siteSettings from "../../settings/site-settings";
import Container from "../ui/container";
import { getErrorMessage } from "../../utils/utils";
import { resetLogin } from "../../redux/slices/userSlice";
import logoutApi from "../../services/auth/logout-api";

const TopHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(resetLogin());
      toast.success("You are successfully logout.");
    } catch (error) {
      const errorMessage = getErrorMessage(error, []);
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <div className="flex justify-between py-3 border-b dark:border-gray-700">
        <div className="md:flex gap-5 hidden">
          <p className="text-primary cursor-pointer font-medium">
            Chat with us
          </p>
          <p className="text-gray-700 dark:text-white">
            {siteSettings.contact}
          </p>
          <p className="text-gray-700 dark:text-white">{siteSettings.email}</p>
        </div>
        <div className="flex gap-5">
          {user.loginStatus ? (
            <button className="text-primary" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-primary">
              Login
            </Link>
          )}

          <Link to="/register" className="text-primary">
            Register
          </Link>
          <Link to="/about" className="text-primary">
            About us
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default TopHeader;
