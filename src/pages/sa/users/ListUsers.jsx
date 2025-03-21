import {
  Box,
  Typography,
  useTheme,
  TextField,
  IconButton,
  Button,
  Switch,
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
import { toast } from "react-toastify";

const ListUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // State variables
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [users, setUsers] = useState([]);
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
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  // Columns for the DataGrid
  const columns = [
    { field: "sr_no", headerName: "SN", filterable: true },
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
          <IconButton
            sx={{ color: 'blue', marginRight: 1 }}
            onClick={() => navigate(`/sa/users/edit/${params.row.id}`)}
          >
            <EditOutlined />
          </IconButton>

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
        const updatedData = data.map((org, index) => ({
          ...org,
          sr_no: index + 1,
        }));
        setUsers(updatedData);
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  // Filter rows based on the search term
  const filteredRows = users.filter((row) => {
    return Object.values(row).some(
      (val) =>
        val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle pagination changes
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle page size changes
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

  // Handle search term changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status toggle (activate/deactivate user)
  const handleStatusToggle = async (id, status) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apis.baseUrl}/register/toggleUserStatus`, { user_id: id, is_active: !status }, {
        headers: {
          Authorization: sessionStorage.getItem("auth_token"),
        },
      });
      setLoading(false);
      toast.success(response.data.message);
      fetchUsers(); 
    } catch (err) {
      setError("Failed to update status");
      setLoading(false);
    }
  };

  // Open the reset password dialog
  const handleOpenResetDialog = (userId) => {
    setSelectedUserId(userId);
    setOpenResetDialog(true);
  };

  // Close the reset password dialog
  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
    setSelectedUserId(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setCurrentPasswordError("");
    setNewPasswordError("");
  };

  // Reset password for a user
  const handleResetPassword = async () => {
    setCurrentPasswordError("");
    setNewPasswordError("");
    setPasswordError("");

    if (!currentPassword) {
      setCurrentPasswordError("Current password is required.");
      return;
    }

    if (newPassword.length < 6) {
      setNewPasswordError("New password must be at least 6 characters.");
      return;
    }

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
          change_password: newPassword ,
          confirm_password: newPassword 
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        }
      );
      if (response.status === 201) {
        toast.success("Password reset successfully");
        fetchUsers();
        handleCloseResetDialog();
      }
    } catch (err) {
      toast.error("Failed to reset password");
    }
  };

  // Fetch users when the component mounts and whenever users or searchTerm changes
  useEffect(() => {
    fetchUsers();
  }, [searchTerm]); // Fetch users when search term changes

  return (
    <Box m="20px">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Header title="Users" />
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
          <AddButton btn="Add New User" Redirect="add" />
        </Box>
      </Box>

      <Box height="75vh" flex={1} sx={{
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
      }}>
        <DataGrid
          rows={filteredRows} // Use filtered rows instead of all users
          columns={columns}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
          onPageSizeChange={handlePageSizeChange}
          page={page}
          onPageChange={handlePageChange}
        />
      </Box>

      <Dialog open={openResetDialog} onClose={handleCloseResetDialog}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the current password, new password, and confirm the new password to reset.
          </DialogContentText>
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!!currentPasswordError}
            helperText={currentPasswordError}
          />
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
            error={!!newPasswordError}
            helperText={newPasswordError}
          />
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
          <Button 
           sx={{
            // width:"130px",
         
            bgcolor: colors.blueAccent[500],
            color:colors.blueAccent[100],
          display:"flex",
            fontWeight: "bold",
            p: "10px 10px",
           
            
            transition: ".3s ease",
            ":hover": {
              bgcolor: colors.blueAccent[700], // Adjust the color for hover state if needed
            },
          }}
          onClick={handleResetPassword} color="secondary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListUsers;
