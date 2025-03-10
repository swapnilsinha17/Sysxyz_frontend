import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, useMediaQuery,Typography } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { apis } from "../../../utils/utills";
import CancelLink from './../../../components/btn/HyperLinkBtn';
import AddButton from './../../../components/btn/AddButton';

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

      navigate("/sa/departments");
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Create Department"
        subtitle="Add new department on the platform by filling the following details"
      />
<div style={{ marginTop: "30px" }}>
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
              
                 <Typography> Department Information</Typography>
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
                  
                  }}
                />
              </Box>
            </fieldset>

           
              {/* Cancel Button */}
              <Box gap={4} display="flex" alignItems="center" justifyContent="end" >
              
                <CancelLink  Hyperbtntext=" Cancel" hyperLinkText="/sa/departments"/>
             

              {/* Submit Button */}
            
               
                <AddButton btn=" Submit"/>
              </Box>
           
          </form>
        )}
      </Formik>
</div>
      
    </Box>
  );
};

export default AddDepartment;
