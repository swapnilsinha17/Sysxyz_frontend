import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { apis } from "../../../utils/utills";

// Validation Schema (same as Add)
const validationSchema = Yup.object({
  org_name: Yup.string().required("Company Name is required").min(3),
  PAN: Yup.string().required("PAN is required").length(10),
  GST_No: Yup.string().required("GST No. is required").min(15),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  primary_contact_person: Yup.string().required("Contact Name is required").min(3),
  primary_contact_number: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  primary_contact_email: Yup.string().required("Email is required").email("Invalid email"),
  access_start_date: Yup.date().required("Start date is required"),
  access_end_date: Yup.date()
    .required("End date is required")
    .min(Yup.ref("access_start_date"), "End date must be after start date"),
});

const EditOrganization = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams(); // Get organization ID from URL
  const [initialValues, setInitialValues] = useState(null);

  // Fetch existing data
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axios.post(`${apis.baseUrl}/sa/getOrganizationDetailsById`,{
            "org_id":id
        }, {
            headers: {
              Authorization: sessionStorage.getItem("auth_token"),
            },
          });
  
          setInitialValues(response.data.org);
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    fetchOrganization();
  }, [id]);

  const handleSubmit = async (values, actions) => {
    try {
        values.org_id = id;
      const response = await axios.post(`${apis.baseUrl}/sa/editOrganization`, values, {
        headers: { Authorization: sessionStorage.getItem("auth_token") },
      });

      console.log("Organization updated successfully:", response.data);
      navigate("/sa/organizations"); // Redirect to organizations list
    } catch (error) {
      console.error("Error updating organization:", error);
    }
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <Box m="20px">
      <Header title="EDIT ORGANIZATION" subtitle="Update organization details" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Ensure form updates when data is fetched
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <fieldset style={{ border: "2px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <legend style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333", padding: "0 10px", marginBottom: "10px" }}>
            
                <p style={{color:"gray"}}> Company Information</p>
              </legend>

              <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
                <TextField fullWidth variant="filled" type="text" label="Company Name" name="org_name"
                  onBlur={handleBlur} onChange={handleChange} value={values.org_name} error={touched.org_name && Boolean(errors.org_name)}
                  helperText={touched.org_name && errors.org_name} sx={{ gridColumn: "span 2",}} />

                <TextField fullWidth variant="filled" type="text" label="Website" name="website"
                  onBlur={handleBlur} onChange={handleChange} value={values.website} error={touched.website && Boolean(errors.website)}
                  helperText={touched.website && errors.website}   sx={{ gridColumn: "span 2",}} />

                <TextField fullWidth variant="filled" type="text" label="PAN" name="PAN"
                  onBlur={handleBlur} onChange={handleChange} value={values.PAN} error={touched.PAN && Boolean(errors.PAN)}
                  helperText={touched.PAN && errors.PAN} />

                <TextField fullWidth variant="filled" type="text" label="GST No." name="GST_No"
                  onBlur={handleBlur} onChange={handleChange} value={values.GST_No} error={touched.GST_No && Boolean(errors.GST_No)}
                  helperText={touched.GST_No && errors.GST_No} />

                <TextField fullWidth variant="filled" type="text" label="State" name="state"
                  onBlur={handleBlur} onChange={handleChange} value={values.state} error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state} />

                <TextField fullWidth variant="filled" type="text" label="City" name="city"
                  onBlur={handleBlur} onChange={handleChange} value={values.city} error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city} />
              </Box>
            </fieldset>

            <fieldset style={{ border: "2px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <legend style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333", padding: "0 10px", marginBottom: "10px" }}>
              
                <p style={{color:"gray"}}>  Point Of Contact</p>
              </legend>

              <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))">
                <TextField fullWidth variant="filled" type="text" label="Name" name="primary_contact_person"
                  onBlur={handleBlur} onChange={handleChange} value={values.primary_contact_person} error={touched.primary_contact_person && Boolean(errors.primary_contact_person)}
                  helperText={touched.primary_contact_person && errors.primary_contact_person} />

                <TextField fullWidth variant="filled" type="text" label="Phone" name="primary_contact_number"
                  onBlur={handleBlur} onChange={handleChange} value={values.primary_contact_number} error={touched.primary_contact_number && Boolean(errors.primary_contact_number)}
                  helperText={touched.primary_contact_number && errors.primary_contact_number} />

                <TextField fullWidth variant="filled" type="email" label="Email" name="primary_contact_email"
                  onBlur={handleBlur} onChange={handleChange} value={values.primary_contact_email} error={touched.primary_contact_email && Boolean(errors.primary_contact_email)}
                  helperText={touched.primary_contact_email && errors.primary_contact_email} />
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
                  
                />
              </Box>
            </fieldset>
            <fieldset style={{ border: "2px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <legend style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333", padding: "0 10px", marginBottom: "10px" }}>
       
        <p style={{color:"gray"}}> Subscription</p>
        </legend>
              <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))">
                <TextField fullWidth variant="filled" type="date" label="Start Date" name="access_start_date"
                  onBlur={handleBlur} onChange={handleChange} value={values.access_start_date}
                  error={touched.access_start_date && Boolean(errors.access_start_date)}
                  helperText={touched.access_start_date && errors.access_start_date} />
                <TextField fullWidth variant="filled" type="date" label="End Date" name="access_end_date"
                  onBlur={handleBlur} onChange={handleChange} value={values.access_end_date}
                  error={touched.access_end_date && Boolean(errors.access_end_date)}
                  helperText={touched.access_end_date && errors.access_end_date} />
              </Box>
            </fieldset>
            <Box display="flex" justifyContent="end" gap="12px" mt="20px">
              <Button onClick={() => navigate("/sa/organizations")} color="primary" variant="contained">
                Cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditOrganization;
