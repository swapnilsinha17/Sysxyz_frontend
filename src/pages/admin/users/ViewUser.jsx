import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio, useMediaQuery } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { apis } from "../../../utils/utills";

// Initial values for Formik
const initialValues = {
  org_id: "",
  dept_id: "",
  employee_code: "",
  full_name: "",
  phone: "",
  email: "",
  role: "",
};

const ViewUser = () => {
  const [companies, setCompanies] = useState([]); // State to store company data
  const [departments, setDepartments] = useState([]); // State to store department data
  const [loading, setLoading] = useState(true); // Loading state for API request
  const [user, setUser] = useState(null); // State to store user data
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL params

  // Fetch companies and departments from API when component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${apis.baseUrl}/sa/getOrganizationlist`, {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        });
        setCompanies(response?.data?.org?.organizations); // Assuming the response contains a list of companies
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apis.baseUrl}/users/getUser/${userId}`, {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        });
        setUser(response?.data?.user); // Assuming the response contains user details
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCompanies();
    fetchUser();
  }, [userId]);

  // Fetch departments when a company is selected
  const fetchDepartments = async (companyId) => {
    try {
      const response = await axios.get(`${apis.baseUrl}/sa/getDepartmentList`, {
        headers: {
          Authorization: sessionStorage.getItem("auth_token"),
        },
      });
      setDepartments(response?.data?.org?.departments); // Assuming the response contains a list of departments
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Handle company change
  const handleCompanyChange = (e, setFieldValue) => {
    const companyId = e.target.value;
    setFieldValue("org_id", companyId);
    fetchDepartments(companyId);
  };

  return (
    <Box m="20px">
      <Header title="VIEW USER" subtitle="View user details" />

      {/* If user data is loading, display loading message */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form>
          {/* Company Info Fieldset */}
          <fieldset
            style={{
              border: "2px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <legend
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#333",
                padding: "0 10px",
                marginBottom: "10px",
              }}
            >
              Company Information
            </legend>

            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel id="org_id-label">Select Company</InputLabel>
                <Select
                  labelId="org_id-label"
                  id="org_id"
                  name="org_id"
                  value={user?.org_id || ""}
                  label="Select Company"
                  disabled
                >
                  {companies.map((company) => (
                    <MenuItem key={company.org_id} value={company.org_id}>
                      {company.org_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <InputLabel id="dept_id-label">Select Department</InputLabel>
                <Select
                  labelId="dept_id-label"
                  id="dept_id"
                  name="dept_id"
                  value={user?.dept_id || ""}
                  label="Select Department"
                  disabled
                >
                  {departments.map((department) => (
                    <MenuItem key={department.dept_id} value={department.dept_id}>
                      {department.department_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Employee Code"
                value={user?.employee_code || ""}
                name="employee_code"
                disabled
                sx={{
                  gridColumn: "span 2",
                  backgroundColor: "#F2F0F0",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#F2F0F0",
                  },
                }}
              />
            </Box>
          </fieldset>

          {/* User Info Fieldset */}
          <fieldset
            style={{
              border: "2px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <legend
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#333",
                padding: "0 10px",
                marginBottom: "10px",
              }}
            >
              User Information
            </legend>

            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                value={user?.full_name || ""}
                name="full_name"
                disabled
                sx={{
                  gridColumn: "span 2",
                  backgroundColor: "#F2F0F0",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#F2F0F0",
                  },
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                value={user?.phone || ""}
                name="phone"
                disabled
                sx={{
                  gridColumn: "span 2",
                  backgroundColor: "#F2F0F0",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#F2F0F0",
                  },
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                value={user?.email || ""}
                name="email"
                disabled
                sx={{
                  gridColumn: "span 2",
                  backgroundColor: "#F2F0F0",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#F2F0F0",
                  },
                }}
              />
            </Box>
          </fieldset>

          {/* Role Fieldset */}
          <fieldset
            style={{
              border: "2px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <legend
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#333",
                padding: "0 10px",
                marginBottom: "10px",
              }}
            >
              Role Information
            </legend>

            <Box>
              <RadioGroup row name="role" value={user?.role || ""} disabled>
                <FormControlLabel
                  value="Doer"
                  control={<Radio />}
                  label="Doer"
                />
                <FormControlLabel
                  value="Manager"
                  control={<Radio />}
                  label="Manager"
                />
                <FormControlLabel
                  value="Auditor"
                  control={<Radio />}
                  label="Auditor"
                />
              </RadioGroup>
            </Box>
          </fieldset>

          {/* Cancel Button */}
          <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
            <Button
              onClick={() => navigate("/sa/users")}
              type="button"
              color="primary"
              variant="contained"
            >
              Back to Users
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default ViewUser;
