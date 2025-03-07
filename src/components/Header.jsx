/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
// import { tokens } from "../theme";
const Header = ({ title, subtitle }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography
        variant="h1"
        fontWeight="bold"
       
        padding="10px"
      >
        {title}
      </Typography>
      <Typography variant="h5" ml={1} >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header; // Default export
