import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
   Dashboard,

 
} from "./scenes";
// superAdmin: 
// import AddOrganization from "./scenes/addorganization";
import ListOrganization from "./pages/sa/organizations/ListOrganization";
import AddOrganization from "./pages/sa/organizations/AddOrganization";
import ViewOrganization from "./pages/sa/organizations/ViewOrganization";

import ListDepartment from "./pages/sa/departments/ListDepartment";
import AddDepartment from "./pages/sa/departments/AddDepartment";
// import ViewDepartment from "./pages/sa/departments/ViewDepartment";
import Signup from "../src/pages/auth/SignIn";
import PrivateRoute from "./scenes/layout/privateroute/PrivateRoute";
import EditOrganization from "./pages/sa/organizations/EditOrganization";
import ListUsers from "./pages/sa/users/ListUsers";
import AddUser from "./pages/sa/users/AddUser";
import ViewUser from "./pages/sa/users/ViewUser";
import EditUser from "./pages/sa/users/EditUSer";
import EditDepartment from "./pages/sa/departments/EditDepartment";

// admin 
import AdminListDepartment from "./pages/admin/departments/ListDepartment";
import AdminAddDepartment from "./pages/admin/departments/AddDepartment";
import AdminEditDepartment from "./pages/admin/departments/EditDepartment";
import AdminListUsers from "./pages/admin/users/ListUsers";
import AdminAddUser from "./pages/admin/users/AddUser";
import AdminViewUser from "./pages/admin/users/ViewUser";
import AdminEditUser from "./pages/admin/users/EditUSer";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Signup />} />
        <Route path="" element={<PrivateRoute><App /></PrivateRoute>}>

        {/* superAdmin:  */}
        <Route path="sa/dashboard" element={<Dashboard />} />
       
          <Route path="sa/organizations">
            <Route index element={<ListOrganization />} />
            <Route path="add" element={<AddOrganization />} />
            <Route path="view/:id" element={<ViewOrganization />} />
            <Route path="edit/:id" element={<EditOrganization />} />
          </Route>
          <Route path="sa/departments">
            <Route index element={<ListDepartment/>} />
            <Route path="add" element={<AddDepartment/>} />
            <Route path="edit/:id" element={<EditDepartment />} />
          </Route>
          <Route path="sa/users">
            <Route index element={<ListUsers />} />
            <Route path="add" element={<AddUser />} />
            <Route path="view/:id" element={<ViewUser />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>
      
          {/* admin */}
          <Route path="admin/dashboard" elemetnt={<Dashboard/>}/>
          
          <Route path="admin/departments">
            <Route index element={<AdminListDepartment />} />
            <Route path="add" element={<AdminAddDepartment />} />
          
            <Route path="edit/:id" element={<AdminEditDepartment />} />
          </Route>
          <Route path="admin/users">
            <Route index element={<AdminListUsers />} />
            <Route path="add" element={<AdminAddUser />} />
            <Route path="view/:id" element={<AdminViewUser />} />
            <Route path="edit/:id" element={<AdminEditUser />} />
          </Route>
          </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;


