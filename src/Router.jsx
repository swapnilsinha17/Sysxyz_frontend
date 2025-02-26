import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,

  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Department,
  Calendar,
  Stream,
} from "./scenes";
// import AddOrganization from "./scenes/addorganization";
import ListOrganization from "./pages/organizations/ListOrganization";
import AddOrganization from "./pages/organizations/AddOrganization";
import ViewOrganization from "./pages/organizations/ViewOrganization";

import ListDepartment from "./pages/departments/ListDepartment";
import AddDepartment from "./pages/departments/AddDepartment";
import ViewDepartment from "./pages/departments/ViewDepartment";
import Signup from "../src/pages/auth/SignIn";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Signup />} />
        <Route path="" element={<App />}>
        <Route path="/dashboard" element={<Dashboard />} />
       
        
          <Route path="/department" element={<Department />} />
          {/* <Route path="/add-organization" element={<AddOrganization />} /> */}
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} />
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
