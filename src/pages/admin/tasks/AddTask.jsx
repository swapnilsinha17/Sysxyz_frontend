import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, useMediaQuery } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";

import { apis } from "../../../utils/utills";

// Initial form values
const initialValues = {
  type: "",
  title: "",
  description: "",
  dept_id: "",
  assign_to: "",
  due_date: "",
};

// Validation schema
const taskSchema = Yup.object({
  type: Yup.string().required("Task Type is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  dept_id: Yup.string().required("Department is required"),
  assign_to: Yup.string().required("Assign To is required"),
  due_date: Yup.date().required("Due Date is required").min(new Date(), "Due Date cannot be in the past"),
});

const AddTask = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  // State for storing department and assignee data
  const [departments, setDepartments] = useState([]);
  const [assignees, setAssignees] = useState([]);

  // Fetch departments and assignees from APIs
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${apis.baseUrl}/sa/getDepartmentList`, {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        });
        console.log(response.data)
        setDepartments(response?.data?.org.departments); 
         
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };

    const fetchAssignees = async () => {
      try {
        const response = await axios.get(
          `${apis.baseUrl}/register/getUserList`, 
          {
            headers: {
              Authorization: sessionStorage.getItem("auth_token"),
            },
          }
        );
           setAssignees(response.data.data);
      } catch (error) {
        console.error("Error fetching assignees", error);
      }
    };

    fetchDepartments();
    fetchAssignees();
  }, []);

  const handleSubmit = async (values, actions) => {
    try {
      values.extra_fields = [{"no-field":"no-filed"}]
      const response = await axios.post(
        `${apis.baseUrl}/tasks/addTask`, 
        values,
        {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        }
      );   console.log("Task created successfully:", response.data);

      actions.resetForm({ values: initialValues });
      navigate("/tasks"); // Redirect to tasks page
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE TASK" subtitle="Add a new task to the platform by filling out the details" />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={taskSchema}
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
                Task Information
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
                {/* Task Type */}
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel>Task Type</InputLabel>
                  <Select
                    label="Task Type"
                    name="type"
                    value={values.type}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.type && Boolean(errors.type)}
                  >
                    <MenuItem value="Add Hoc">Add Hoc</MenuItem>
                    <MenuItem value="Recurring">Recurring</MenuItem>
                  </Select>
                </FormControl>

                {/* Title */}
                <TextField
                  fullWidth
                  variant="filled"
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
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

                {/* Description */}
                <TextField
                  fullWidth
                  variant="filled"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  sx={{
                    gridColumn: "span 4",
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
                Task Allocation
              </legend>

              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 3",
                  },
                }}
              >
                {/* Department */}
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    label="Department"
                    name="dept_id"
                    value={values.dept_id}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.dept_id && Boolean(errors.dept_id)}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.dept_id} value={dept.dept_id}>
                        {dept.department_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Assign To */}
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
                  <InputLabel>Assign To</InputLabel>
                  <Select
                    label="Assign To"
                    name="assign_to"
                    value={values.assign_to}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.assign_to && Boolean(errors.assign_to)}
                  >
                    {assignees.map((assignee) => (
                      <MenuItem key={assignee.id} value={assignee.id}>
                        {assignee.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Due Date */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="Due Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.due_date}
                  name="due_date"
                  error={touched.due_date && Boolean(errors.due_date)}
                  helperText={touched.due_date && errors.due_date}
                  sx={{
                    gridColumn: "span 1",
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

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              {/* Cancel Button */}
              <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
                <Button
                  onClick={() => navigate("/tasks")} // Redirect to the tasks page
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

export default AddTask;
