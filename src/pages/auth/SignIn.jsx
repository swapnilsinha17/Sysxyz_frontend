import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Container,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { formatEmployeeCode } from "../../utils/formatter";
import { IoMdClose } from "react-icons/io";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apis } from "../../utils/utills";
import axios from "axios";
import logoImg from "../../assets/images/logo/XYZ_OPS_Logo.png";
import fullimg from "../../assets/images/logo/Data_security_01.jpg";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [company_code, setCompanyCode] = useState("");

  const [employee_code, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    company_code: "",
    employee_code: "",
    password: "",
  });

  const navigate = useNavigate();
  const AccessToken = sessionStorage.getItem("user")?.token;

  useEffect(() => {
    if (AccessToken) {
      navigate("/sa/dashboard");
    }
  }, [AccessToken, navigate]);

  const validateForm = () => {
    const newErrors = { company_code: "", employee_code: "", password: "" };

    if (!company_code) newErrors.company_code = "Company Code is required.";
    if (!employee_code) newErrors.employee_code = "Employee Code is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form validation failed.");
      return;
    }

    try {
      console.log("Sending login request...");
      const response = await axios.post(`${apis.baseUrl}/register/login`, {
        company_code,
        employee_code,
        password,
      });


      if (response.status === 201) {
        const userData = response.data.data;
        console.log("ddata", userData);
        if (userData?.token) {
          sessionStorage.setItem("user", JSON.stringify(userData));
          sessionStorage.setItem("auth_token", userData.token);
          sessionStorage.setItem("fullName", userData.full_name);
          //   toast.success(response.data.message || "Login successful");
          navigate(
            userData.role === "sa" ? "/sa/dashboard" : "/admin/dashboard"
          );
        } else {
          toast.error("Failed to retrieve token.");
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };
  const handleEmployeeCodeChange = (e) => {
    const formattedCode = formatEmployeeCode(e.target.value);
    setEmployeeCode(formattedCode);
  };
  return (
    <div className="gradient-bg">
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: 800,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box display="flex" justifyContent="center" mb={2}>
              <img src={logoImg} alt="XYZOPS Logo" style={{ height: 96 }} />
            </Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Sign In
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
              mb={3}
            >
              Fill out the form below to proceed
            </Typography>
            <form onSubmit={handleLogin}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Company Code"
                  value={company_code}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numeric input and restrict to max length of 5 digits
                    if (/^\d{0,5}$/.test(value)) {
                      setCompanyCode(value);
                    }
                  }}
                  error={!!errors.company_code}
                  helperText={errors.company_code}
                  InputProps={{
                    endAdornment: company_code && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setCompanyCode("")}
                          tabIndex={-1} // Make this non-focusable with Tab
                        >
                          <IoMdClose />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  tabIndex={0} // Ensure this is the first field in tab order
                  inputProps={{
                    maxLength: 5, // Limit input length to 5
                    pattern: "[0-9]*", // Allow only digits
                    min: 10000,
                    max: 99999,
                  }}
                />
              </Box>

              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Employee Code"
                  value={employee_code}
                  onChange={handleEmployeeCodeChange}
                  error={!!errors.employee_code}
                  helperText={errors.employee_code}
                  margin="normal"
                  tabIndex={1} // This will be the next input field
                  InputProps={{
                    endAdornment: employee_code && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setEmployeeCode("")}
                          tabIndex={-1} // Make this non-focusable with Tab
                        >
                          <IoMdClose />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1} // Make this non-focusable with Tab
                        >
                          {showPassword ? (
                            <LiaEyeSlashSolid />
                          ) : (
                            <LiaEyeSolid />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  tabIndex={2} // This will be the next input field
                />
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 4, borderRadius: 1 }}
                tabIndex={3} // Submit button will be last in tab order
              >
                LOGIN
              </Button>
            </form>
          </CardContent>
          <Box sx={{ display: { xs: "none", sm: "block" }, flex: 1 }}>
            <img
              src={fullimg}
              alt="Authentication"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Card>
      </Container>
    </div>
  );
}
