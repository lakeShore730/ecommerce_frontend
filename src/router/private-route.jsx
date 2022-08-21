import { Navigate } from "react-router-dom";
import { getToken } from "../utils/utils";

const PrivateRoute = (props) => {
  const { children, ...other } = props;
  const isLogin = getToken();

  if (!isLogin) return <Navigate to="/login" replace />;
  return <div {...other}>{children}</div>;
};

export default PrivateRoute;
