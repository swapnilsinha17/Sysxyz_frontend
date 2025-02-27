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
            <Route path="view" element={<ViewOrganization />} />
          </Route>
          <Route path="departments">
            <Route index element={<ListDepartment/>} />
            <Route path="add" element={<AddDepartment/>} />
            <Route path="view" element={<ViewDepartment />} />
          </Route>
          </Route>
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
