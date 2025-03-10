import {
  Box,
  Typography,
  useTheme,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Switch, // Import Switch for the toggle
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { EditOutlined, LockResetOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apis } from "../../../utils/utills";
import AddButton from "../../../components/btn/AddButton";

const ListUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // State variables
  const [pageSize, setPageSize] = useState(10); // Tracks the page size
  const [page, setPage] = useState(0); // Tracks the current page
  const [searchTerm, setSearchTerm] = useState(""); // Tracks the search term
  const [users, setUsers] = useState([]); // Stores the user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dialog state for password reset
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Password fields for the dialog
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Columns for the DataGrid
  const columns = [
    { field: "id", headerName: "SN", filterable: true },
    { field: "name", headerName: "Name", flex: 1, filterable: true },
    { field: "department_name", headerName: "Department", flex: 1, filterable: true },
    { field: "email", headerName: "Email", flex: 1, filterable: true },
    { field: "organisation_name", headerName: "Company", flex: 1, filterable: true },
    { field: "employee_code", headerName: "Employee Code", flex: 1, filterable: true },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      filterable: true,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* Toggle Button */}
          <Switch
            checked={params.row.is_active}
            onChange={() => handleStatusToggle(params.row.id, params.row.is_active)}
            color="secondary"
          />
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          {/* Edit Button */}
          <IconButton
            sx={{ color: 'blue', marginRight: 1 }}
            onClick={() => navigate(`/sa/users/edit/${params.row.id}`)}
        
          >
            <EditOutlined />
          </IconButton>

          {/* Reset Password Button */}
          <IconButton
           color="secondary"
            onClick={() => handleOpenResetDialog(params.row.id)}
          >
            <LockResetOutlined />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Handle pagination changes
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle page size changes
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(0); // Reset page when page size changes
  };

  // Handle search term changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch users from the server
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apis.baseUrl}/register/getUserList`, {
        headers: {
          Authorization: sessionStorage.getItem("auth_token"),
        },
      });
      const { data } = response.data;

      if (data) {
        setUsers(data); // Update the state with the fetched users
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  // Open the reset password dialog
  const handleOpenResetDialog = (userId) => {
    setSelectedUserId(userId); // Set the selected user ID for the reset
    setOpenResetDialog(true); // Open the dialog
  };

  // Close the reset password dialog
  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
    setSelectedUserId(null); // Clear selected user ID
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  // Reset password for a user
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
    
    try {
      const response = await axios.post(
        `${apis.baseUrl}/register/resetPassword`,
        { 
          user_id: selectedUserId,
          current_password: currentPassword,
          new_password: newPassword 
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        }
      );
      if (response.status === 200) {
        alert("Password reset successfully");
        fetchUsers(); // Refresh the user list
        handleCloseResetDialog(); // Close the dialog
      }
    } catch (err) {
      alert("Failed to reset password");
    }
  };

  // Fetch users on page change, page size change, or search term change
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box m="20px"
   >
     <Box sx={{ 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center"
}} >
  {/* Title Section (Header) on the Left */}

    <Header title="Users" />
 

  {/* Search Box and New Button Section on the Right */}
  <Box mb={2} display="flex" gap={4} alignItems="center">
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={searchTerm}
      color="secondary"
      onChange={handleSearchChange}
      sx={{ maxWidth: "300px" }}
    />

    {/* New Button */}
    <AddButton btn="Add New User" Redirect="add" />
  </Box>
</Box>

     
   

      {/* DataGrid */}
      <Box  height="75vh" flex={1} sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": { border: "none" },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
          color: "white",
        },

        "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          color: "white",
          backgroundColor: colors.blueAccent[700],
        },
        "& .css-7ms3qr-MuiTablePagination-displayedRows": { 
          color: "#fcfcfc",
        },
        "& .css-1hgjne-MuiButtonBase-root-MuiIconButton-root.Mui-disabled": {
          color:"#fcfcfc",
        },
       
      }}>
        <DataGrid
          rows={users}
          columns={columns}
         
          pageSize="10"
          
          pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
        />
      </Box>

   
      <Dialog open={openResetDialog} onClose={handleCloseResetDialog}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the current password, new password, and confirm the new password to reset.
          </DialogContentText>

          {/* Current Password Field */}
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* New Password Field */}
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Confirm Password Field */}
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!!passwordError}
            helperText={passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResetDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleResetPassword} color="secondary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListUsers;
