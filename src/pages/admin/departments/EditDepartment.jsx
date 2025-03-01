import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, useMediaQuery } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { apis } from "../../../utils/utills";

// Initial values for Formik
const initialValues = {
  org_id: "",
  department_name: "",
};

const checkoutSchema = Yup.object({
  department_name: Yup.string()
    .required("Department Name is required")
    .min(3, "Department Name must be at least 3 characters long"),
  org_id: Yup.string().required("Please select Organization"),
});

const EditDepartment = () => {
  const [companies, setCompanies] = useState([]); // State to store company data
  const [department, setDepartment] = useState(null); // State to store department data
  const [loading, setLoading] = useState(true); // Loading state for API request
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { departmentId } = useParams(); // Get departmentId from URL

  // Fetch companies and department data when component mounts
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
      }
    };

    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`${apis.baseUrl}/sa/getDepartment/${departmentId}`, {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        });
        setDepartment(response?.data?.department); // Assuming the response contains the department data
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };

    fetchCompanies();
    fetchDepartment();
  }, [departmentId]);

  // Handle form submission
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.put(
        `${apis.baseUrl}/sa/updateDepartment/${departmentId}`,
        values,
        {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        }
      );

      console.log("Department updated successfully:", response.data);

      actions.resetForm({
        values: initialValues,
      });

      navigate("/departments");
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  if (loading || !department) return <div>Loading...</div>; // Display loading if data is still being fetched

  return (
    <Box m="20px">
      <Header
        title="EDIT DEPARTMENT"
        subtitle="Update the department details on the platform by modifying the following information"
      />

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          org_id: department.org_id || "",
          department_name: department.department_name || "",
        }}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Fieldset Wrapper */}
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
                Department Information
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
                    onChange={handleChange}
                    error={touched.org_id && Boolean(errors.org_id)}
                  >
                    {companies.map((company) => (
                      <MenuItem key={company.org_id} value={company.org_id}>
                        {company.org_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.org_id && errors.org_id && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.org_id}
                    </div>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Department Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.department_name}
                  name="department_name"
                  error={touched.department_name && Boolean(errors.department_name)}
                  helperText={touched.department_name && errors.department_name}
                  sx={{
                    gridColumn: "span 2",
                    backgroundColor: "#F2F0F0", // Set background color to white
                    border: "1px solid #ddd", // Set border color
                    borderRadius: "4px", // Rounded corners for the input box
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
              </Box>
            </fieldset>

            <div className="flex gap-4 justify-end">
              {/* Cancel Button */}
              <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
                <Button
                  onClick={() => navigate("/sa/departments")}
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

export default EditDepartment;
