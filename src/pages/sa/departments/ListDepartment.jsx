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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddButton from "../../../components/btn/AddButton";
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
      valueFormatter: (params) => {
         
        return params.value;
      },
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
        <Box display="flex" justifyContent="center" gap={6} alignItems="center" >
          {/* Edit Button */}

          
           < EditIcon
           
           color="secondary"
              onClick={() => navigate(`/sa/departments/edit/${params.row.dept_id}`)}
            
            />
         

          {/* Delete Button */}
          
            < DeleteIcon
              color="secondary"
              onClick={() => handleOpenDeleteDialog(params.row.dept_id)}
              />
       
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
    <Box mx="20px">
      {/* <ToastContainer  autoClose={3000} /> */}
      <Box   
          display="flex"
          justifyContent="space-between"
          alignItems="center">
 <Header title="Departments" />
     
     
    <Box  display="flex" justifyContent="space-between" gap={4}  alignItems="center">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
            color="secondary"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ maxWidth: "300px",
         
           }}
        />
      
        <AddButton btn=" Add New" Redirect="add" />
      
</Box>
</Box>
    

      <Box height="85vh" flex={1}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          
          pageSize="10"
          
          pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}

          sx={{ "& .MuiDataGrid-columnHeaders": {
            // backgroundColor: '#fafafa',
            
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            color: "#fcfcfc",
          },
          "& .MuiButtonBase-root": {
            color: "#fcfcfc",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            color: "#fcfcfc",
          },
          "& .css-7ms3qr-MuiTablePagination-displayedRows": {
            color: "#fcfcfc",
          },
          "& .css-1hgjne-MuiButtonBase-root-MuiIconButton-root.Mui-disabled": {
            color: "#fcfcfc",
          },
          "& .css-jtezpp-MuiDataGrid-root .MuiButtonBase-root": {
            color: "#fcfcfc",
         
          }
        }}
        />
       
    
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
