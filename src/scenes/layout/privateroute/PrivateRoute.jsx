import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const AccessToken = sessionStorage.getItem("auth_token");
  if (!AccessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default PrivateRoute;
