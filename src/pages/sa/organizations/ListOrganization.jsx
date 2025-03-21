  import {
    Box,
    Typography,
    useTheme,
    TextField,
    MenuItem,
    Select,
    FormControl,
    Switch,
    InputLabel,
    Button,
  } from "@mui/material";
  import { Header } from "../../../components";
 
  import { DataGrid } from "@mui/x-data-grid";
  import { toast , ToastContainer} from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
 
  
  
  import { tokens } from "../../../theme";
  
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  // import AddOrganization from "./AddOrganization";
  import axios from "axios";
  import { apis } from "../../../utils/utills";
import { formatCityName, formatDate } from "../../../utils/formatter";

import AddButton from "../../../components/btn/AddButton";
  const ListOrganization = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);
    console.log("tata color",colors);
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(10); // Track the current page size
    const [page, setPage] = useState(0); // Track the current page number
    const [searchTerm, setSearchTerm] = useState(""); // Track the search term
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   const handleStatusToggle = async (id, currentStatus) => {
  try {
    // Determine new status based on current status
    const newStatus = currentStatus === true ? 0 : 1;  // Toggling between 1 (Active) and 0 (Inactive)

    // Optimistically update the UI before the API call
    setOrganizations((prevOrgs) =>
      prevOrgs.map((org) =>
        org.org_id === id ? { ...org, status: newStatus } : org
      )
    );

    // Send the update request to the server
    const response = await axios.post(
      `${apis.baseUrl}/sa/updateOrganizationStatus`,
      { org_id: id, status: newStatus },
      {
        headers: {
          Authorization: sessionStorage.getItem("auth_token"),
        },
      }
    );

    // Display a success toast notification
    const statusText = newStatus === 1 ? "Active" : "Inactive";
    toast.success(`Status updated to ${statusText}`, {
      position: "top-right",
      autoClose: 3000, // Closes after 3 seconds
    });

    // Optionally log the server response
    console.log("Status updated successfully:", response.data);

    // Re-fetch organizations to ensure data consistency if needed
    fetchOrganizations();
  } catch (error) {
    // Log the error if the API call fails
    console.error("Error updating status:", error);

    // Revert the UI change if the API call fails
    setOrganizations((prevOrgs) =>
      prevOrgs.map((org) =>
        org.org_id === id ? { ...org, status: currentStatus } : org
      )
    );

    // Optionally, show an error toast
    toast.error("Failed to update status. Please try again later.", {
      position: "top-right",
      autoClose: 3000, // Closes after 3 seconds
    });
  }
};

    const columns = [
      {
        field: "id",
        headerName: "SN",
        filterable: true,
     
      },{
        field: "org_name",
        headerName: "Company",
        flex: 1,
        cellClassName: "company-column--cell",
        filterable: true,
        renderCell: (params) => (
          <Typography
            sx={{
              color: colors.blueAccent[500],
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": colors.blueAccent[800],
            }}
            onClick={() => navigate(`/sa/organizations/view/${params.row.org_id}`)}
          >
            {params.value}
          </Typography>
        ),
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
        field: "access_end_date",
        headerName: "Access Ends On",
        // type: "date",
        headerAlign: "left",
        align: "left",
        filterable: true,
        flex: 1,
        valueFormatter: (params) => {
          return formatDate(params.value); // Format the date before displaying
        },
      },
      {
        field: "is_active",
        headerName: "Status",
        flex: 1,
        filterable: true,
        renderCell: (params) => (
          <Switch
          color="secondary"
            checked={params.value == true}
            onChange={() => handleStatusToggle(params.row.org_id, params.value)}
           
          />
        ),
      },
      {
        field: "city",
        headerName: "City",
        flex: 1,
        filterable: true,
        valueFormatter: (params) => {
          return formatCityName(params.value); // Apply the formatter to the city value
        },
      },
      {
        field: "state",
        headerName: "State",
        flex: 1,
        filterable: true,
        valueFormatter: (params) => {
          return formatCityName(params.value); // Apply the formatter to the city value
        },
      },
     
    ];

    // Handle page change
    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

    // Handle page size change
    const handlePageSizeChange = (event) => {
      setPageSize(event.target.value);
      setPage(0); // Reset page to 0 when page size changes
    };

    // Handle search term change
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    // Filter the rows based on search term
    const filteredRows = organizations.filter((row) => {
      return Object.values(row).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Total and filtered row counts
    const totalRows = organizations.length;
    const filteredRowsCount = filteredRows.length;
    useEffect(() => {
      console.log("Updated Organizations:", organizations);
    }, [organizations]); 
    const fetchOrganizations = async () => {
      console.log("Xz")
      try {
        const response = await axios.get(
          `${apis.baseUrl}/sa/getOrganizationlist`,
          {
            headers: {
              Authorization: sessionStorage.getItem("auth_token"), // `${AccesssToken}`,  // Basic authentication header
            },
          }
        );
      console.log(response.data.org.organizations,"res")
        const orgData = response?.data?.org?.organizations;
      
        if (orgData && orgData.length > 0) {
          console.log(organizations)
          const updatedData = orgData.map((org, index) => ({
            ...org,
            id: index +1, // Assuming 'org_id' is unique
          }));
          
          setOrganizations(updatedData);
          // setOrganizations(orgData);
          console.log(organizations)
          console.log("response data of organizationssss", organizations);
        } else {
          console.error("No organizations found in response");
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch organizations");
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchOrganizations();
    }, []);
    return (


      <Box mx="20px">
         <ToastContainer  autoClose={3000} />
   
       

        {/* Search Box and New Button */}
        
        <Box
          // mb={2} mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
         
        >
           <Header title="Organizations" />
           <Box   display="flex"  gap={4}  alignItems="center">
           <TextField

           className="css-ty8hyp-MuiInputBase-root-MuiOutlinedInput-root"
            label="Search"
         
            variant="outlined"
            fullWidth
            
            color="secondary"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ maxWidth: "300px" ,
          
             
            }} 
          />

          {/* New Button */}
     <AddButton btn="ADD NEW" Redirect="add" />
           </Box>
     

        </Box>
  <Box
           height="85vh"
           flex={1}
          sx={{
           

            "& .MuiDataGrid-columnHeaders": {
              
              
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
             
              color: colors.blueAccent[100],
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              color: colors.blueAccent[100],
              backgroundColor: colors.blueAccent[700],
            },
           
            "& .MuiTablePagination-root": {
            
            
              color: colors.blueAccent[100],
            },
            "& .MuiButtonBase-root": {
              
              color: colors.blueAccent[100],
            },
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize="10"
            
            pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
          />

          
        </Box>
      </Box>
    );
  };

  export default ListOrganization;
