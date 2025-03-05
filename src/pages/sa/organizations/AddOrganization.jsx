import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Typography, useTheme } from '@mui/material';
const initialValues ={
  org_name: "",
  access_start_date: "",
  access_end_date: "",
  primary_contact_person: "",
  primary_contact_email: "",
  primary_contact_number: "",
  website: "",
  PAN: "",
  employee_code: "",
  GST_No: "",
  city: "",
  state: "",
};

import axios from "axios";
const checkoutSchema = Yup.object({
  // Company Information
  org_name: Yup.string()
    .required("Company Name is required")
    .min(3, "Company Name must be at least 3 characters long"),

  PAN: Yup.string()
    .required("PAN is required")
    .min(10, "PAN must be 10 characters"),
  GST_No: Yup.string()
    .required("GST No. is required")
    .min(15, "GST No. must be at least 15 characters"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),

  // Point Of Contact Information
  primary_contact_person: Yup.string()
    .required("Contact Name is required")
    .min(3, "Contact Name must be at least 3 characters"),
  primary_contact_number: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  primary_contact_email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  // Subscription Information
  access_start_date: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date must be in the future"),
  access_end_date: Yup.date()
    .required("End date is required")
    .min(Yup.ref("access_start_date"), "End date must be after start date"),
});

import { apis } from "../../../utils/utills";
import { tokens } from "../../../theme";
// import { useTheme } from "@emotion/react";
const AddOrganization = () => {
  const theme= useTheme();
 
  const colors = tokens(theme.palette.mode);
  console.log("ffffffffffffffffffff",colors);
  const isNonMobile = useMediaQuery("(min-width:600px)");

const handleSubmit = async (values, actions) => {
  try {
    // Making the POST request to the backend API
    const response = await axios.post(`${apis.baseUrl}/sa/addOrganization`, values,

      {
        headers: {
          Authorization: sessionStorage.getItem("auth_token"), // `${AccesssToken}`,  // Basic authentication header
        },
      }
    );

    // Handle the response after successfully adding the data to the database
    console.log('Organization added successfully:', response.data);
    toast.success('Organization added successfully'); // Display a success toast message

    // Optionally reset the form after successful submission
    actions.resetForm({
      values: initialValues,
    });

    // Optionally navigate to another page after submission
    navigate('/sa/organizations'); // Redirect to the organizations page

  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error adding organization:', error);
  }
};


  const navigate = useNavigate();

  //  const handleChange(()=>{

  //  })
  return (
    <Box m="20px">
      <Header
        title="CREATE ORGANIZATION"
        subtitle="Add new organization on the platform by filling the following details"
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
                  // color: "#333",
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
             
              >
                <Typography sx={{ color: colors.primary[100] }}>
      Company Information
    </Typography>
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
                  label="Company Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.org_name}
                  name="org_name"
                  error={touched.org_name && Boolean(errors.org_name)}
                  helperText={touched.org_name && errors.org_name}
                  sx={{
                    gridColumn: "span 2",
                  
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Website"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="website"
                  error={touched.website && errors.website}
                  helperText={touched.website && errors.website}
                  sx={{
                    gridColumn: "span 2",
                   
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="PAN"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.PAN}
                  name="PAN"
                  error={touched.PAN && Boolean(errors.PAN)}
                  helperText={touched.PAN && errors.PAN}
                  sx={{
                    gridColumn: "span 1",
                   
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="GST No."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.GST_No}
                  name="GST_No"
                  error={touched.GST_No && Boolean(errors.GST_No)}
                  helperText={touched.GST_No && errors.GST_No}
                  sx={{
                    gridColumn: "span 1",
                  
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="State"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state}
                  name="state"
                  error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                  sx={{
                    gridColumn: "span 1",
                  
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  sx={{
                    gridColumn: "span 1",
                    
                  }}
                />
              </Box>
            </fieldset>

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
                  // color: "#333",
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
              >
             
                <Typography sx={{ color: colors.primary[100] }}>
                Point Of Contact :: Administrator
                </Typography>
              
              </legend>

              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 2",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label=" Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.primary_contact_person}
                  name="primary_contact_person"
                  error={
                    touched.primary_contact_person &&
                    Boolean(errors.primary_contact_person)
                  }
                  helperText={
                    touched.primary_contact_person &&
                    errors.primary_contact_person
                  }
                  sx={{
                    gridColumn: "span 1",
                    // backgroundColor: "#F2F0F0", // Set background color to white
                   
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.primary_contact_number}
                  name="primary_contact_number"
                  error={
                    touched.primary_contact_number &&
                    Boolean(errors.primary_contact_number)
                  }
                  helperText={
                    touched.primary_contact_number &&
                    errors.primary_contact_number
                  }
                  sx={{
                    gridColumn: "span 1",
                   
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.primary_contact_email}
                  name="primary_contact_email"
                  error={
                    touched.primary_contact_email &&
                    Boolean(errors.primary_contact_email)
                  }
                  helperText={
                    touched.primary_contact_email &&
                    errors.primary_contact_email
                  }
                  sx={{
                    gridColumn: "span 1",
                   
                  }}
                />
                 <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Employee Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.employee_code}
                  name="employee_code"
                  error={
                    touched.employee_code &&
                    Boolean(errors.employee_code)
                  }
                  helperText={
                    touched. employee_code &&
                    errors. employee_code
                  }
                  sx={{
                    gridColumn: "span 1",
                
                  }}
                />
              </Box>
            </fieldset>

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
                  // color: "#333",
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
              >
              
                <Typography sx={{ color: colors.primary[100] }}>
                Subscription
                </Typography>
               
              </legend>

              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 2",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Start Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.access_start_date}
                  name="access_start_date"
                  error={touched.access_start_date && Boolean(errors.access_start_date)}
                  helperText={
                    touched.access_start_date && errors.access_start_date
                  }
                  sx={{
                    gridColumn: "span 1",
                    
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="End Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.access_end_date}
                  name="access_end_date"
                  error={touched.access_end_date && Boolean(errors.access_end_date)}
                  helperText={touched.access_end_date && errors.access_end_date}
                  sx={{
                    gridColumn: "span 1",
                  
                  }}
                />
              </Box>
            </fieldset>

            <div className="flex gap-4 justify-end">
              {/* cancel Button */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                mt="20px"
              >
                <Button
                  onClick={() => {
                    // Handle the 'New' button action, e.g., open a modal or redirect

                    navigate("/sa/organizations");
                  }}
                  type="button"
                 color="secondary"
                  variant="contained"
                >
                  Cancel
                </Button>
                
              </Box>

              {/* Submit Button */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                mt="20px"
              >
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

export default AddOrganization;
