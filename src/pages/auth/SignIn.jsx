import { useEffect, useState } from "react";
import logoImg from "../../assets/images/logo/XYZ_OPS_Logo.png";
import fullimg from "../../assets/images/logo/Data_security_01.jpg";
// import { Eye, EyeOff, X } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { apis } from "../../utils/utills";
import axios from "axios";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [company_code, setcompany_code] = useState("");
  const [employee_code, setemployee_code] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    company_code: "",
    employee_code: "",
    password: "",
  });


  const AccessToken = sessionStorage.getItem("auth_token");


  useEffect(() => {
    if (AccessToken) {
      navigate("/sa/dashboard");
    }
  }, [AccessToken]);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { company_code: "", employee_code: "", password: "" };

    if (!company_code) {
      newErrors.company_code = "Company Code is required.";
    }

    if (!employee_code) {
      newErrors.employee_code = "Employee Code is required.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(`${apis.baseUrl}/register/login`, {
        company_code,
        employee_code,
        password,
      });
console.log("response data of token",response?.data?.data?.token);


      if (response.status === 201) {
        sessionStorage.setItem(
          "auth_token",

          response?.data?.data?.token
        );
       
        // console.log("as", response?.data?.data?.token);
        toast.success(response?.data?.message || "Login successful");
        window.location.href = "/sa/dashboard";
      } else {
        toast.error(response?.data?.message || "Error while Login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="gradient-bg flex min-h-screen w-full items-center justify-center bg-[#E5E7EB] p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-lg">

         {/* Login Form Section */}
         <div className="flex w-full flex-1 flex-col justify-center p-3 sm:p-8">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img src={logoImg} alt="XYZOPS Logo" className="h-24" />
          </div>

          {/* Sign In Text */}
          <div className="mb-4 text-center">
            <h1 className="mb-1 text-2xl font-semibold text-[#1F2937]">
              Sign In
            </h1>
            <p className="text-sm text-[#4B5563]">
              Fill out the form below to proceed
            </p>
          </div>

          {/* Login Form */}
          <form className="w-full space-y-12" onSubmit={handleSubmit}>
            {/* Company Code */}
            <div className="w-full space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-[#4B5563]">Company Code</label>
                <div className="relative">
                  <input
                    type="text"
                    name="company_code"
                    value={company_code}
                    onChange={(e) => setcompany_code(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-3 pr-10 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your company code"
                  />
                  {company_code && (
                    <button
                      type="button"
                      onClick={() => setcompany_code("")}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      <IoMdClose className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </button>
                  )}
                </div>
                {errors.company_code && (
                  <p className="text-sm text-red-500">{errors.company_code}</p>
                )}
              </div>

              {/* Employee Code */}
              <div className="space-y-1">
                <label className="text-sm text-[#4B5563]">Employee Code</label>
                <input
                  type="text"
                  name="employee_code"
                  value={employee_code}
                  onChange={(e) => setemployee_code(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter your employee code"
                />
                {errors.employee_code && (
                  <p className="text-sm text-red-500">{errors.employee_code}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm text-[#4B5563]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-3 pr-10 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? (
                      <LiaEyeSlashSolid className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <LiaEyeSolid className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className=" w-full rounded-full bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              LOGIN
            </button>
          </form>
        </div>
        {/* Left Image Section (Hidden on Small Screens) */}
        <div className="hidden flex-1 sm:flex">
          <img
            src={fullimg}
            alt="Authentication"
            className="h-full w-full object-cover"
          />
        </div>

       
      </div>
    </div>
  );
}
