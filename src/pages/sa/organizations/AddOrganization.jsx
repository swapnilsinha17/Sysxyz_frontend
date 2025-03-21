import { Box, Button, TextField, useMediaQuery ,FormControl,InputLabel, Select, MenuItem} from "@mui/material";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";

import { toast , ToastContainer} from "react-toastify";
import { Typography, useTheme } from '@mui/material';


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
  employee_code: Yup.string().required("Employee code is required"),

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
import CancelLink from "../../../components/btn/HyperLinkBtn";
import AddButton from "../../../components/btn/AddButton";
// import { useTheme } from "@emotion/react";
const AddOrganization = () => {
  const theme= useTheme();
 
  const colors = tokens(theme.palette.mode);
  console.log("ffffffffffffffffffff",colors);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleStateChange = (e, setFieldValue) => {
    const stateCode = e.target.value;
    setFieldValue("state", stateCode); // Set state
    setFieldValue("city", ""); // Reset city
  };

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
    toast.error(error.response.data.message);
    // Handle any errors that occur during the request
    console.error('Error adding organization:', error);
  }
};


  const navigate = useNavigate();

  //  const handleChange(()=>{

  //  })
  return (
    <Box m="20px" >
      <Header
        title="Create Organization"
        subtitle="Add a new organization on the platform by filling the following details"
      />
<div style={{ marginTop: "30px" }}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
       style={{mt:"50px"}}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
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
                <Typography>
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
                  // onChange={handleChange}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("PAN", e.target.value.toUpperCase()); // Convert PAN to uppercase
                  }}
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
                  // onChange={handleChange}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("GST_No", e.target.value.toUpperCase()); // Convert PAN to uppercase
                  }}
                  value={values.GST_No}
                  name="GST_No"
                  error={touched.GST_No && Boolean(errors.GST_No)}
                  helperText={touched.GST_No && errors.GST_No}
                  sx={{
                    gridColumn: "span 1",
                  
                  }}
                />
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
                  <InputLabel>State</InputLabel>
                  <Select
                    label="State"
                    value={values.state}
                    onChange={(e) => handleStateChange(e, setFieldValue)}
                    error={touched.state && Boolean(errors.state)}
                  >
                    {statesList.map((state) => (
                      <MenuItem key={state.code} value={state.code}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
                  <InputLabel>City</InputLabel>
                  <Select
                    label="City"
                    value={values.city}
                    onChange={handleChange}
                    name="city"
                    error={touched.city && Boolean(errors.city)}
                    disabled={!values.state}
                  >
                    {values.state &&
                      citiesList[values.state]?.map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              
                {/* <TextField
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
                /> */}
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
             
                <Typography>
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
              
                <Typography>
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
                  type="date"
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
                  type="date"
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

          
              <Box
                display="flex"
               
                justifyContent="end"
              
                gap={4}
                 alignItems="center"
              >
     <CancelLink Hyperbtntext="cancel" hyperLinkText="/sa/organizations"/>
                
             

              {/* Submit Button */}
             <AddButton btn="Submit"/>
             </Box>
          
          </form>
        )}
      </Formik>
      </div>
    </Box>
  );
};

export default AddOrganization;
