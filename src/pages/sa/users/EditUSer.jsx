import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio, useMediaQuery, Typography } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { apis } from "../../../utils/utills";
import CancelLink from "../../../components/btn/HyperLinkBtn";
import AddButton from "../../../components/btn/AddButton";

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

const checkoutSchema = Yup.object({
  org_id: Yup.string().required("Please select a Company"),
  dept_id: Yup.string().required("Please select a Department"),
  employee_code: Yup.string().required("Employee Code is required"),
  full_name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  phone: Yup.string().required("Phone number is required").matches(/^[0-9]+$/, "Phone number must be digits only"),
  email: Yup.string().required("Email is required").email("Invalid email format"),
  role: Yup.string().required("Please select a Role"),
});

const EditUser = () => {
  const [companies, setCompanies] = useState([]); // State to store company data
  const [departments, setDepartments] = useState([]); // State to store department data
  const [loading, setLoading] = useState(true); // Loading state for API request
  const [user, setUser] = useState(null); // State to store user data
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams(); // Get userId from URL params

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
    fetchCompanies();

    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(`${apis.baseUrl}/register/getUserById`,{user_id:id}, {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        });
        setUser(response?.data?.data); // Assuming the response contains user data
        fetchDepartments(response?.data?.org_id); // Fetch departments for the user's company
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [id]);

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

  // Handle form submission
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.put(
        `${apis.baseUrl}/register/updateUser/${userId}`,
        values,
        {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        }
      );
      console.log("User updated successfully:", response.data);
      actions.resetForm({
        values: initialValues,
      });
      navigate("/sa/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) return <div>Loading user data...</div>; // Show loading while fetching user details

  return (
    <Box m="20px">
      <Header
        title="Edit User"
        subtitle="Edit user details by filling the form below"
      />
<div  style={{ marginTop: "30px" }}>
<Formik
        onSubmit={handleSubmit}
        initialValues={user} // Use the fetched user data as the initial values
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
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
                 
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
              >
              
               
                <Typography>Company Information</Typography>
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
                    value={values.org_id}
                    label="Select Company"
                    onBlur={handleBlur}
                    onChange={(e) => handleCompanyChange(e, setFieldValue)}
                    error={touched.org_id && Boolean(errors.org_id)}
                  >
                    {loading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : (
                      companies.map((company) => (
                        <MenuItem key={company.org_id} value={company.org_id}>
                          {company.org_name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {touched.org_id && errors.org_id && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.org_id}
                    </div>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="dept_id-label">Select Department</InputLabel>
                  <Select
                    labelId="dept_id-label"
                    id="dept_id"
                    name="dept_id"
                    value={values.dept_id}
                    label="Select Department"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.dept_id && Boolean(errors.dept_id)}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.dept_id} value={department.dept_id}>
                        {department.department_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.dept_id && errors.dept_id && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.dept_id}
                    </div>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Employee Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.employee_code}
                  name="employee_code"
                  error={touched.employee_code && Boolean(errors.employee_code)}
                  helperText={touched.employee_code && errors.employee_code}
                  sx={{
                    gridColumn: "span 2",
                   
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
                 
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
              >
                
                
                <Typography>  User Information</Typography>
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.full_name}
                  name="full_name"
                  error={touched.full_name && Boolean(errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                  sx={{
                    gridColumn: "span 2",
                    // backgroundColor: "#F2F0F0",
                    // border: "1px solid #ddd",
                    // borderRadius: "4px",
                    // "& .MuiFilledInput-root": {
                    //   backgroundColor: "#F2F0F0",
                    // },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  sx={{
                    gridColumn: "span 2",
                    // backgroundColor: "#F2F0F0",
                    // border: "1px solid #ddd",
                    // borderRadius: "4px",
                    // "& .MuiFilledInput-root": {
                    //   backgroundColor: "#F2F0F0",
                    // },
                  }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    gridColumn: "span 2",
                    // backgroundColor: "#F2F0F0",
                    // border: "1px solid #ddd",
                    // borderRadius: "4px",
                    // "& .MuiFilledInput-root": {
                    //   backgroundColor: "#F2F0F0",
                    // },
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
               
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
              >
               <Typography>Role Information</Typography> 
              </legend>

              <Box>
                <RadioGroup
                  row
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
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
                {touched.role && errors.role && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.role}
                  </div>
                )}
              </Box>
            </fieldset>

            <div className="flex gap-4 justify-end">
              {/* Cancel Button */}
              <Box display="flex" alignItems="center" justifyContent="end" gap={4}>
                
                <CancelLink  Hyperbtntext="Cancel" hyperLinkText="/sa/users"/>
              
                <AddButton btn=" Submit"/>
              </Box>
            </div>
          </form>
        )}
      </Formik>
</div>
      
    </Box>
  );
};

export default EditUser;
