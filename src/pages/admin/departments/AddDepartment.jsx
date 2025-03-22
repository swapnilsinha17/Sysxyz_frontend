import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, useMediaQuery } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { apis } from "../../../utils/utills";

// Initial values for Formik
const initialValues = {
 
  department_name: "",
};

const checkoutSchema = Yup.object({
  department_name: Yup.string()
    .required("Department Name is required")
    .min(3, "Department Name must be at least 3 characters long"),
});

const AddDepartment = () => {
  const [companies, setCompanies] = useState([]); // State to store company data
  const [loading, setLoading] = useState(true); // Loading state for API request
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  // Fetch companies from API when component mounts
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
  }, []);

  // Handle form submission
  const handleSubmit = async (values, actions) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user")); 
      values.org_id = user.org_id;
      const response = await axios.post(
        `${apis.baseUrl}/sa/addDepartment`,
        values,
        {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        }
      );

      console.log("Department added successfully:", response.data);

      actions.resetForm({
        values: initialValues,
      });

      navigate("/admin/departments");
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="CREATE DEPARTMENT"
        subtitle="Add new department on the platform by filling the following details"
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

export default AddDepartment;
