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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DeleteOutline } from '@mui/icons-material';
import { Header } from "../../../components";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apis } from "../../../utils/utills";
import { tokens } from "../../../theme";

const ListDepartment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete Confirmation Dialog States
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState(null); // Track the department to delete

  const columns = [
    { field: "id", headerName: "SN", filterable: true },
    {
      field: "org_name",
      headerName: "Company",
      flex: 1,
      filterable: true,
    },
    {
      field: "org_id",
      headerName: "Code",
      flex: 1,
      headerAlign: "left",
      align: "left",
      type: "number",
      filterable: true,
    },
    {
      field: "department_name",
      headerName: "Department Name",
      headerAlign: "left",
      align: "left",
      filterable: true,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      filterable: true,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* Edit Button */}
          <Button
            onClick={() => navigate(`/sa/departments/edit/${params.row.dept_id}`)}
            sx={{
              color: colors.blueAccent[100],
              backgroundColor: '#fff',
              marginRight: 2,
              textTransform: 'none',
              '&:hover': {
                color: colors.blueAccent[800],
              },
            }}
          >
            Edit
          </Button>

          {/* Delete Button */}
          <Button
            onClick={() => handleOpenDeleteDialog(params.row.dept_id)}
            sx={{
              color: colors.redAccent[700],
              textTransform: "none",
              '&:hover': {
                color: colors.redAccent[800],
              },
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    }
  ];

  const handlePageChange = (newPage) => setPage(newPage);
  const handlePageSizeChange = (event) => setPageSize(event.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredRows = organizations.filter((row) =>
    Object.values(row).some((val) =>
      val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${apis.baseUrl}/sa/getDepartmentList`,
        {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        }
      );
      const orgData = response?.data?.org?.departments;
      if (orgData && orgData.length > 0) {
        const updatedData = orgData.map((org, index) => ({
          ...org,
          id: index + 1,
        }));
        setOrganizations(updatedData);
      } else {
        console.error("No departments found in response");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch department");
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = (deptId) => {
    setSelectedDeptId(deptId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedDeptId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.post(`${apis.baseUrl}/sa/deleteDepartment`,{dept_id: selectedDeptId}, {
        headers: {
          Authorization: sessionStorage.getItem("auth_token"),
        },
      });
      // Remove the department from the state
      setOrganizations((prevState) => prevState.filter((dept) => dept.dept_id !== selectedDeptId));
      handleCloseDeleteDialog();
      fetchDepartments()
    } catch (err) {
      console.error("Error deleting department", err);
      setError("Failed to delete department");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <Box m="20px">
      <Header title="DEPARTMENT" />
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ maxWidth: "300px" }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: colors.blueAccent[700],
            color: "#fcfcfc",
            fontWeight: "bold",
            p: "10px 20px",
            mt: "18px",
            ":hover": { bgcolor: colors.blueAccent[800] },
          }}
          onClick={() => navigate("add")}
        >
          Add New
        </Button>
      </Box>

      {/* <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Rows per page:</Typography>
        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel>Per Page</InputLabel>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            label="Rows per page"
          >
            {[10, 20, 50, 100].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}

      <Box mt="40px" height="75vh" flex={1}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={pageSize}
          page={page}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pagination
        />
        {/* <Box display="flex" justifyContent="flex-end" mt={2}>
          <Typography>
            {searchTerm
              ? `Showing ${page * pageSize + 1} to ${Math.min((page + 1) * pageSize, filteredRows.length)} of ${filteredRows.length} entries (filtered from ${organizations.length} total entries)`
              : `Showing ${page * pageSize + 1} to ${Math.min((page + 1) * pageSize, organizations.length)} of ${organizations.length} entries`}
          </Typography>
        </Box> */}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this department?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListDepartment;
