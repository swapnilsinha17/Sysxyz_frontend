import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  console.log(requiredRole,"requiredRole")
  const user = JSON.parse(sessionStorage.getItem("user")); // Or any global state you use to store user data
  const isAuthenticated = user && user.token;  // Example check for authentication
  const userRole = user?.role; // Assume the user object contains a role (e.g., 'admin', 'superAdmin')

  if (!isAuthenticated) {
    console.log("Here")
    return <Navigate to="/" />; // Redirect to login page if not authenticated
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log("hhh")
    if(isAuthenticated){
      if(userRole == 'sa'){
      return <Navigate to="/sa/dashboard" />
      }else    if(userRole == 'Doer'){
        return <Navigate to="/doer/tasks" />
      }else    if(userRole == 'Auditor'){
        return <Navigate to="/auditor/tasks" />
      }else    if(userRole == 'Manager'){
        return <Navigate to="/manager/tasks" />
      }else{
        return <Navigate to="/admin/dashboard" />
      }
    }
    return <Navigate to="/" />; // Redirect if the role doesn't match
  }

  return children;
};

export default PrivateRoute;
