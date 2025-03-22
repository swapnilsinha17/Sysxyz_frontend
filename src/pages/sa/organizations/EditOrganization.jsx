import { Box, Button, TextField, Typography, useMediaQuery, useTheme,FormControl,InputLabel, Select, MenuItem } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { apis } from "../../../utils/utills";
import { tokens } from "../../../theme";
import CancelLink from "../../../components/btn/HyperLinkBtn";
import AddButton from "../../../components/btn/AddButton";

const statesList = [
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'WB', name: 'West Bengal' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'DL', name: 'Delhi' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'BR', name: 'Bihar' },
  { code: 'PB', name: 'Punjab' },
  { code: 'HR', name: 'Haryana' },
  { code: 'JK', name: 'Jammu and Kashmir' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'KL', name: 'Kerala' },
  { code: 'OR', name: 'Odisha' },
  { code: 'AS', name: 'Assam' },
  { code: 'CG', name: 'Chhattisgarh' },
  { code: 'UT', name: 'Uttarakhand' },
  { code: 'HP', name: 'Himachal Pradesh' },
  { code: 'JH', name: 'Jharkhand' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'NL', name: 'Nagaland' },
  { code: 'SK', name: 'Sikkim' },
  { code: 'AR', name: 'Arunachal Pradesh' },
  { code: 'ML', name: 'Meghalaya' },
  { code: 'MZ', name: 'Mizoram' },
  { code: 'TR', name: 'Tripura' },
  { code: 'AM', name: 'Andaman and Nicobar Islands' },
  { code: 'LD', name: 'Lakshadweep' },
  { code: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu' },
  { code: 'PY', name: 'Puducherry' },
];

const citiesList = {
  UP: ['Lucknow', 'Agra', 'Kanpur', 'Varanasi', 'Allahabad', 'Meerut', 'Gorakhpur', 'Aligarh', 'Mathura', 'Firozabad'],
  KA: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Bellary', 'Tumkur', 'Davangere', 'Mandya', 'Chitradurga'],
  MH: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Kalyan', 'Solapur', 'Kolhapur', 'Ratnagiri'],
  TN: ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Tirunelveli', 'Tiruchirapalli', 'Erode', 'Vellore', 'Dindigul'],
  WB: ['Kolkata', 'Siliguri', 'Asansol', 'Durgapur', 'Howrah', 'Medinipur', 'Bardhaman', 'Malda', 'Kolar', 'Birbhum'],
  GJ: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Junagadh', 'Navsari', 'Anand', 'Valsad', 'Gandhinagar'],
  DL: ['New Delhi', 'Old Delhi', 'Dwarka', 'Karol Bagh', 'Connaught Place', 'Lajpat Nagar', 'Chandni Chowk', 'Rohini', 'Vikas Puri', 'Preet Vihar'],
  RJ: ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Chittorgarh', 'Sikar', 'Bhilwara'],
  AP: ['Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore', 'Rajahmundry', 'Kakinada', 'Anantapur', 'Chittoor'],
  BR: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Munger', 'Purnia', 'Darbhanga', 'Siwan', 'Buxar', 'Katihar'],
  PB: ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Moga', 'Hoshiarpur', 'Mohali', 'Ferozepur'],
  HR: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Sonipat', 'Rohtak', 'Hisar', 'Karnal', 'Yamunanagar', 'Rewari'],
  JK: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Pulwama', 'Kupwara', 'Kathua', 'Rajouri', 'Poonch', 'Kishtwar'],
  MP: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Rewa', 'Satna', 'Guna', 'Dewas'],
  KL: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Palakkad', 'Kannur', 'Kottayam', 'Malappuram', 'Thrissur', 'Alappuzha'],
  OR: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Balasore', 'Koraput', 'Rayagada', 'Angul', 'Jajpur'],
  AS: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tinsukia', 'Nagaon', 'Sibsagar', 'Bongaigaon', 'Tezpur', 'Bailong'],
  CG: ['Raipur', 'Bilaspur', 'Korba', 'Durg', 'Raigarh', 'Jagdalpur', 'Rajnandgaon', 'Bemetara', 'Surajpur', 'Mungeli'],
  UT: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Roorkee', 'Haldwani', 'Pauri', 'Tehri', 'Kashipur', 'Ramnagar'],
  HP: ['Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Solan', 'Mandi', 'Bilaspur', 'Hamirpur', 'Kangra', 'Palampur'],
  JH: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar', 'Giridih', 'Dumka', 'Ramgarh', 'Chaibasa'],
  NL: ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Peren', 'Zunheboto', 'Mon', 'Tuensang', 'Kiphire', 'Longleng'],
  SK: ['Gangtok', 'Namchi', 'Mangan', 'Rangpo', 'Jorethang', 'Yuksom', 'Pakyong', 'Martam', 'Singtam', 'Tadong'],
  AR: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Tezu', 'Seppa', 'Aalo', 'Changlang', 'Rupa'],
  ML: ['Shillong', 'Jowai', 'Nongpoh', 'Tura', 'Williamnagar', 'Mawkyrwat', 'Baghmara', 'Nongstoin', 'Mawlai', 'Mairang'],
  MZ: ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Serchhip', 'Saiha', 'Lawngtlai', 'Mamit', 'Hnahthial', 'Khawzawl'],
  TR: ['Agartala', 'Udaipur', 'Ambassa', 'Kailashahar', 'Belonia', 'Sabroom', 'Khowai', 'Radhakishorepur', 'Jirania', 'Badharghat'],
  AM: ['Port Blair', 'Car Nicobar', 'Campbell Bay', 'Diglipur', 'Mayabunder', 'Rangat', 'Havelock', 'Baratang', 'Little Andaman', 'Kalapathar'],
  LD: ['Kavaratti', 'Agatti', 'Andrott', 'Bangaram', 'Suheli Par', 'Kalapeni', 'Minicoy', 'Kochi', 'Pitti Island', 'Lakshadweep'],
  DN: ['Daman', 'Diu', 'Silvassa', 'Khanvel', 'Vapi', 'Dadra', 'Damanji', 'Daman District', 'Silvassa District', 'Vansda'],
  PY: ['Puducherry', 'Karaikal', 'Yanam', 'Mahe'],
};
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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  const handleStateChange = (e, setFieldValue) => {
    const stateCode = e.target.value;
    setFieldValue("state", stateCode); // Set state
    setFieldValue("city", ""); // Reset city
  };
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
      <Header title="Edit Organization" subtitle="Edit and save the organization information here" />
<div style={{ marginTop: "30px" }}>
<Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Ensure form updates when data is fetched
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <fieldset style={{ border: "2px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <legend style={{ fontSize: "1.2rem", padding: "0 10px", marginBottom: "10px" }}>
            
              <Typography >
      Company Information
    </Typography>
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

<FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                    <InputLabel>State</InputLabel>
                    <Select
                      label="State"
                      name="state"
                      value={values.state}
                      onBlur={handleBlur}
                      onChange={(e) => handleStateChange(e, setFieldValue)}
                      error={touched.state && Boolean(errors.state)}
                    >
                      {statesList.map((state) => (
                        <MenuItem key={state.code} value={state.code}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.state && errors.state && <Typography color="error">{errors.state}</Typography>}
                  </FormControl>

                  <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                    <InputLabel>City</InputLabel>
                    <Select
                      label="City"
                      name="city"
                      value={values.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.city && Boolean(errors.city)}
                    >
                      {values.state &&
                                           citiesList[values.state]?.map((city) => (
                                             <MenuItem key={city} value={city}>
                                               {city}
                                             </MenuItem>
                                           ))}
                    </Select>
                    {touched.city && errors.city && <Typography color="error">{errors.city}</Typography>}
                  </FormControl>
              </Box>
            </fieldset>

            <fieldset style={{ border: "2px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <legend style={{ fontSize: "1.2rem",  padding: "0 10px", marginBottom: "10px" }}>
              
             
                <Typography>
                Point Of Contact
                </Typography>
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
              <legend style={{ fontSize: "1.2rem", padding: "0 10px", marginBottom: "10px" }}>
       
        
        
        <Typography>
        Subscription
        </Typography>
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
            <Box display="flex" justifyContent="end"  gap={4}
                 alignItems="center">
             
              <CancelLink Hyperbtntext=" Cancel" hyperLinkText="/sa/organizations"/>
             
              <AddButton btn="Update"/>
            </Box>
          </form>
        )}
      </Formik>
</div>
      
    </Box>
  );
};

export default EditOrganization;
