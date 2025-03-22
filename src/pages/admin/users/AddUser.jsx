import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio, useMediaQuery } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { apis } from "../../../utils/utills";

// Initial values for Formik
const initialValues = {

  dept_id: "",
  employee_code: "",
  full_name: "",
  phone: "",
  email: "",
  role: "",
};

const checkoutSchema = Yup.object({
  dept_id: Yup.string().required("Please select a Department"),
  employee_code: Yup.string().required("Employee Code is required"),
  full_name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  phone: Yup.string().required("Phone number is required").matches(/^[0-9]+$/, "Phone number must be digits only"),
  email: Yup.string().required("Email is required").email("Invalid email format"),
  role: Yup.string().required("Please select a Role"),
});

const AddUser = () => {
  const [companies, setCompanies] = useState([]); // State to store company data
  const [departments, setDepartments] = useState([]); // State to store department data
  const [loading, setLoading] = useState(true); // Loading state for API request
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  // Fetch companies and departments from API when component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user")); 
        const comapnyId = user.org_id;
       
        const response = await axios.get(`${apis.baseUrl}/sa/getDepartmentList`, {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        });
        console.log(response.data)
        setDepartments(response?.data?.org.departments); // Assuming the response contains a list of departments
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch departments when a company is selected
  

  // Handle company change
 

  // Handle form submission
  const handleSubmit = async (values, actions) => {
    try {
        values.password = "Qwerty@123"
        values.language_id = 1; 
        const user = JSON.parse(sessionStorage.getItem("user")); 
        values.org_id = user.org_id;
       
      const response = await axios.post(
        `${apis.baseUrl}/register/addUser`,
        values,
        {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        }
      );

      console.log("User added successfully:", response.data);

      actions.resetForm({
        values: initialValues,
      });

      navigate("/admin/users");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="CREATE USER"
        subtitle="Add new user to the platform by filling the following details"
      />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.full_name}
                  name="full_name"
                  error={touched.full_name && Boolean(errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
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
              <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
                <Button
                  onClick={() => navigate("/sa/users")}
                  type="button"
                  color="primary"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>

              {/* Submit Button */}
              <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Submit
                </Button>
              </Box>
            </div>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddUser;
