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
  } from "@mui/material";
  import { Header } from "../../components";
  import { DataGrid } from "@mui/x-data-grid";
  import { tokens } from "../../theme";
  import { EditOutlined, LockResetOutlined } from "@mui/icons-material";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { apis } from "../../utils/utills";
  
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
  
    // Columns for the DataGrid
    const columns = [
      { field: "id", headerName: "SN", filterable: true },
      { field: "name", headerName: "Name", flex: 1, filterable: true },
      { field: "department_name", headerName: "Department", flex: 1, filterable: true },
      { field: "email", headerName: "Email", flex: 1, filterable: true },
      { field: "organisation_name", headerName: "Company", flex: 1, filterable: true },
      { field: "employee_code", headerName: "Employee Code", flex: 1, filterable: true },
      { field: "is_active", headerName: "Status", flex: 1, filterable: true },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center">
            {/* Edit Button */}
            <IconButton
              sx={{ color: 'blue', marginRight: 1 }}
              onClick={() => handleEdit(params.row)}
            >
              <EditOutlined />
            </IconButton>
  
            {/* Reset Password Button */}
            <IconButton
              sx={{ color: 'orange' }}
              onClick={() => handleResetPassword(params.row.id)}
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
        const response = await axios.get(
          `${apis.baseUrl}/register/getUserList`, 
          {
            headers: {
              Authorization: sessionStorage.getItem("auth_token"),
            },
          }
        );
  console.log(response.data)
        const { data } = response.data;
  
        console.log("here", data)
        if (data) {
          setUsers(data); // Update the state with the fetched users
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
  
    // Fetch users on page change, page size change, or search term change
    useEffect(() => {
      fetchUsers();
    }, []);
  
    return (
      <Box m="20px">
        <Header title="USER LIST" />
  
        {/* Search Box and New Button */}
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ maxWidth: "300px" }}
          />
          
          {/* New Button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: colors.blueAccent[700],
              color: "#fcfcfc",
              fontWeight: "bold",
              p: "10px 20px",
              mt: "18px",
              transition: ".3s ease",
              ":hover": { bgcolor: colors.blueAccent[800] },
            }}
            onClick={() => navigate("add")}
          >
            Add New User
          </Button>
        </Box>
  
        {/* Per Page Dropdown */}
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Rows per page:</Typography>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Per Page</InputLabel>
            <Select value={pageSize} onChange={handlePageSizeChange} label="Rows per page">
              {[10, 20, 50, 100].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
  
        {/* DataGrid */}
        <Box mt="40px" height="75vh" flex={1} sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            color: colors.primary[500],
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            color: colors.primary[500],
            backgroundColor: colors.blueAccent[700],
          },
        }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={pageSize}
            page={page}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pagination
            loading={loading}
          />
        </Box>
  
        {/* Pagination Info */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Typography>
            {searchTerm
              ? `Showing ${page * pageSize + 1} to ${Math.min((page + 1) * pageSize, users.length)} of ${users.length} entries (filtered)`
              : `Showing ${page * pageSize + 1} to ${Math.min((page + 1) * pageSize, users.length)} of ${users.length} entries`}
          </Typography>
        </Box>
      </Box>
    );
  };
  
  export default ListUsers;
  