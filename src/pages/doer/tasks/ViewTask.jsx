import { Box, Button, TextField, InputLabel, FormControl, Select, MenuItem, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apis } from "../../../utils/utills"; // Assuming this file contains API endpoint URLs

const TaskView = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get taskId from URL params

  // Fetch task data from API when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.post(`${apis.baseUrl}/tasks/getTaskById`,{task_id : id}, {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        });
        setTask(response?.data?.data); // Assuming the response contains task data
      } catch (error) {
        console.error("Error fetching task data:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };   

    fetchTask();
  }, [id]);

  // Handle file selection (image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle task completion
  const handleMarkAsComplete = async () => {
    try {
      await axios.put(
        `${apis.baseUrl}/tasks/markAsComplete/${taskId}`,
        { comment, image },
        {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        }
      );
      alert("Task marked as complete");
      navigate("/tasks"); // Navigate to the task list or another appropriate page
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>Task View</Typography>

      {/* Loading Spinner */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box>
            {/* Task Details */}
            <Typography variant="h6">Title: {task?.title}</Typography>
            <Typography variant="body1">Description: {task?.description}</Typography>
            <Typography variant="body1">Type: {task?.type}</Typography>
            <Typography variant="body1">Assigned to: {task?.assigned_user}</Typography>
            <Typography variant="body1">Due Date: {task?.due_date}</Typography>
          </Box>

          {/* Comment and Image Upload Section */}
          <Box mt="20px">
            <TextField
              fullWidth
              variant="outlined"
              label="Add Comment"
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <Box mt="20px">
              <InputLabel>Upload Image</InputLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: "10px" }}
              />
            </Box>
          </Box>

          {/* Mark as Complete Button */}
          <Box mt="20px" display="flex" justifyContent="flex-end">
            <Button
              color="primary"
              variant="contained"
              onClick={handleMarkAsComplete}
            >
              Mark as Complete
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default TaskView;
