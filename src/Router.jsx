import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
   Dashboard,

 
} from "./scenes";
// import AddOrganization from "./scenes/addorganization";
import ListOrganization from "./pages/organizations/ListOrganization";
import AddOrganization from "./pages/organizations/AddOrganization";
import ViewOrganization from "./pages/organizations/ViewOrganization";

import ListDepartment from "./pages/departments/ListDepartment";
import AddDepartment from "./pages/departments/AddDepartment";
import ViewDepartment from "./pages/departments/ViewDepartment";
import Signup from "../src/pages/auth/SignIn";
import PrivateRoute from "./scenes/layout/privateroute/PrivateRoute";
import EditOrganization from "./pages/organizations/EditOrganization";
import ListUsers from "./pages/users/ListUsers";
import AddUser from "./pages/users/AddUser";
import ViewUser from "./pages/users/ViewUser";
import EditUser from "./pages/users/EditUSer";
import EditDepartment from "./pages/departments/EditDepartment";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Signup />} />
        <Route path="" element={<PrivateRoute><App /></PrivateRoute>}>

        
        <Route path="/dashboard" element={<Dashboard />} />
       
          <Route path="organizations">
            <Route index element={<ListOrganization />} />
            <Route path="add" element={<AddOrganization />} />
            <Route path="view/:id" element={<ViewOrganization />} />
            <Route path="edit/:id" element={<EditOrganization />} />
          </Route>
          <Route path="departments">
            <Route index element={<ListDepartment/>} />
            <Route path="add" element={<AddDepartment/>} />
            <Route path="edit/:id" element={<EditDepartment />} />
          </Route>
          <Route path="users">
            <Route index element={<ListUsers />} />
            <Route path="add" element={<AddUser />} />
            <Route path="view/:id" element={<ViewUser />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>
          </Route>
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
