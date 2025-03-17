import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { Dashboard } from "./scenes";
import ListOrganization from "./pages/sa/organizations/ListOrganization";
import AddOrganization from "./pages/sa/organizations/AddOrganization";
import ViewOrganization from "./pages/sa/organizations/ViewOrganization";
import EditOrganization from "./pages/sa/organizations/EditOrganization";
import ListDepartment from "./pages/sa/departments/ListDepartment";
import AddDepartment from "./pages/sa/departments/AddDepartment";
import EditDepartment from "./pages/sa/departments/EditDepartment";
import ListUsers from "./pages/sa/users/ListUsers";
import AddUser from "./pages/sa/users/AddUser";
import ViewUser from "./pages/sa/users/ViewUser";
import EditUser from "./pages/sa/users/EditUser";
import Signup from "../src/pages/auth/SignIn";
import PrivateRoute from "./scenes/layout/privateroute/PrivateRoute";

// Admin components
import AdminListDepartment from "./pages/admin/departments/ListDepartment";
import AdminAddDepartment from "./pages/admin/departments/AddDepartment";
import AdminEditDepartment from "./pages/admin/departments/EditDepartment";
import AdminListUsers from "./pages/admin/users/ListUsers";
import AdminAddUser from "./pages/admin/users/AddUser";
import AdminViewUser from "./pages/admin/users/ViewUser";
import AdminEditUser from "./pages/admin/users/EditUser";
import ListTask from "./pages/admin/tasks/ListTask";
import AddTask from "./pages/admin/tasks/AddTask";
import ListDoerTask from "./pages/doer/tasks/ListDoerTask";
import ManagerTeamList from "./pages/manager/team/managerTeamList";
import ManagerTaskList from "./pages/manager/tasks/managerTaskList";
import AuditorTaskList from "./pages/auditor/tasks/auditorTaskList";
import AuditorTeamList from "./pages/auditor/teams/auditorTeamList";
import TaskView from "./pages/doer/tasks/ViewTask";
import ViewTeamTask from "./pages/manager/team/viewTeamTask";
import ManagerTaskView from "./pages/manager/tasks/ViewTask";
import ViewAuditorTask from "./pages/auditor/teams/viewAuditorTask";
// import AddTask from "./pages/admin/tasks/AddTaask";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="" element={<App />}>
        
          {/* sa Routes */}
          <Route path="sa/dashboard" element={<PrivateRoute requiredRole="sa"><Dashboard /></PrivateRoute>} />
          <Route path="sa/organizations">
            <Route index element={<PrivateRoute requiredRole="sa"><ListOrganization /></PrivateRoute>} />
            <Route path="add" element={<PrivateRoute requiredRole="sa"><AddOrganization /></PrivateRoute>} />
            <Route path="view/:id" element={<PrivateRoute requiredRole="sa"><ViewOrganization /></PrivateRoute>} />
            <Route path="edit/:id" element={<PrivateRoute requiredRole="sa"><EditOrganization /></PrivateRoute>} />
          </Route>
          <Route path="sa/departments">
            <Route index element={<PrivateRoute requiredRole="sa"><ListDepartment /></PrivateRoute>} />
            <Route path="add" element={<PrivateRoute requiredRole="sa"><AddDepartment /></PrivateRoute>} />
            <Route path="edit/:id" element={<PrivateRoute requiredRole="sa"><EditDepartment /></PrivateRoute>} />
          </Route>
          <Route path="sa/users">
            <Route index element={<PrivateRoute requiredRole="sa"><ListUsers /></PrivateRoute>} />
            <Route path="add" element={<PrivateRoute requiredRole="sa"><AddUser /></PrivateRoute>} />
            <Route path="view/:id" element={<PrivateRoute requiredRole="sa"><ViewUser /></PrivateRoute>} />
            <Route path="edit/:id" element={<PrivateRoute requiredRole="sa"><EditUser /></PrivateRoute>} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<PrivateRoute requiredRole="Admin"><Dashboard /></PrivateRoute>} />
          <Route path="admin/departments">
            <Route index element={<PrivateRoute requiredRole="Admin"><AdminListDepartment /></PrivateRoute>} />
            <Route path="add" element={<PrivateRoute requiredRole="Admin"><AdminAddDepartment /></PrivateRoute>} />
            <Route path="edit/:id" element={<PrivateRoute requiredRole="Admin"><AdminEditDepartment /></PrivateRoute>} />
          </Route>
          <Route path="admin/users">
            <Route index element={<PrivateRoute requiredRole="Admin"><AdminListUsers /></PrivateRoute>} />
            <Route path="add" element={<PrivateRoute requiredRole="Admin"><AdminAddUser /></PrivateRoute>} />
            <Route path="view/:id" element={<PrivateRoute requiredRole="Admin"><AdminViewUser /></PrivateRoute>} />
            <Route path="edit/:id" element={<PrivateRoute requiredRole="Admin"><AdminEditUser /></PrivateRoute>} />
          </Route>
          <Route path="admin/tasks">
            <Route index element={<PrivateRoute requiredRole="Admin"><ListTask /></PrivateRoute>} />
            <Route path="add" element={<PrivateRoute requiredRole="Admin"><AddTask /></PrivateRoute>} />
            <Route path="view/:id" element={<PrivateRoute requiredRole="Admin"><AdminViewUser /></PrivateRoute>} />
            <Route path="edit/:id" element={<PrivateRoute requiredRole="Admin"><AdminEditUser /></PrivateRoute>} />
          </Route>
{/* </Route> */}
          <Route path="doer/dashboard" element={<PrivateRoute requiredRole="Doer"><Dashboard /></PrivateRoute>} />
         
          <Route path="doer/tasks">
            <Route index element={<PrivateRoute requiredRole="Doer"><ListDoerTask /></PrivateRoute>} />
            <Route path="add" element={<PrivateRoute requiredRole="Doer"><AddTask /></PrivateRoute>} />
            <Route path="view/:id" element={<PrivateRoute requiredRole="Doer"><TaskView /></PrivateRoute>} />
            <Route path="edit/:id" element={<PrivateRoute requiredRole="Doer"><AdminEditUser /></PrivateRoute>} />
          </Route>

          <Route path="manager/tasks">
            <Route index element={<PrivateRoute requiredRole="Manager"><ManagerTaskList /></PrivateRoute>} />
            {/* <Route path="add" element={<PrivateRoute requiredRole="Doer"><AddTask /></PrivateRoute>} /> */}
            <Route path="view/:id" element={<PrivateRoute requiredRole="Manager"><ManagerTaskView /></PrivateRoute>} />
            {/* <Route path="edit/:id" element={<PrivateRoute requiredRole="Doer"><AdminEditUser /></PrivateRoute>} /> */}
          </Route>

          <Route path="manager/team">
            <Route index element={<PrivateRoute requiredRole="Manager"><ManagerTeamList /></PrivateRoute>} />
            {/* <Route path="add" element={<PrivateRoute requiredRole="Doer"><AddTask /></PrivateRoute>} /> */}
            <Route path="view/:id" element={<PrivateRoute requiredRole="Manager"><ViewTeamTask /></PrivateRoute>} />
            {/* <Route path="edit/:id" element={<PrivateRoute requiredRole="Doer"><AdminEditUser /></PrivateRoute>} /> */}
          </Route>
          <Route path="auditor/tasks">
            <Route index element={<PrivateRoute requiredRole="Auditor"><AuditorTaskList /></PrivateRoute>} />
            {/* <Route path="add" element={<PrivateRoute requiredRole="Doer"><AddTask /></PrivateRoute>} /> */}
            <Route path="view/:id" element={<PrivateRoute requiredRole="Doer"><TaskView /></PrivateRoute>} />
            {/* <Route path="edit/:id" element={<PrivateRoute requiredRole="Doer"><AdminEditUser /></PrivateRoute>} /> */}
          </Route>

          <Route path="auditor/team">
            <Route index element={<PrivateRoute requiredRole="Auditor"><AuditorTeamList /></PrivateRoute>} />
            {/* <Route path="add" element={<PrivateRoute requiredRole="Doer"><AddTask /></PrivateRoute>} /> */}
            <Route path="view/:id" element={<PrivateRoute requiredRole="Auditor"><ViewAuditorTask /></PrivateRoute>} />
            {/* <Route path="edit/:id" element={<PrivateRoute requiredRole="Doer"><AdminEditUser /></PrivateRoute>} /> */}
          </Route>
          
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
