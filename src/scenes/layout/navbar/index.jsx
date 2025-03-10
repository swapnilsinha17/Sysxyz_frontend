import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { tokens, ColorModeContext } from "../../../theme";
import { useContext } from "react";

import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  PersonOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { ToggledContext } from "../../../App";
import { MdOutlineChangeCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const theme = useTheme();
  const savedFullName = sessionStorage.getItem("fullName");
  const colorMode = useContext(ColorModeContext);
  const { toggled, setToggled } = useContext(ToggledContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("before logout", sessionStorage.getItem("auth_token"));

    // Remove the token from sessionStorage
    sessionStorage.removeItem("auth_token");

    console.log("after logout", sessionStorage.getItem("auth_token"));

    // Redirect to the login page after logout
    navigate("/"); // Change the path to your login page
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          sx={{ display: `${isMdDevices ? "flex" : "none"}` }}
          onClick={() => setToggled(!toggled)}
        >
          <MenuOutlined />
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center"  gap={1}>
  <Typography variant="h6" noWrap>
    {`Welcome ${savedFullName}`}
  </Typography>
  <IconButton>
    <div>
      <PersonOutlined
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{fontSize:"30"}}
      />
      <Menu
        id="fade-menu"
        MenuListProps={{ "aria-labelledby": "fade-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
           <span>Theme</span>
        </MenuItem>
       
        <MenuItem onClick={handleClose}>
          {" "}
          <span>
            <MdOutlineChangeCircle
              style={{ fontSize: "19", }}
            />
          </span>
          <Typography>Change Password</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <span>
            <IoMdLogOut style={{ fontSize: "19", }} />
          </span>
          Logout
        </MenuItem>
      </Menu>
    </div>
  </IconButton>
</Box>

    </Box>
  );
};

export default Navbar;
