import { useTheme } from '@emotion/react';
import { Button, Typography} from '@mui/material';
import React from 'react'
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';

const AddButton = ({btn,Redirect}) => {
   const theme = useTheme();
   const navigate = useNavigate();
      const colors = tokens(theme.palette.mode);
  return (
    <div>
             <Button
             type='submit'
  variant="contained"
  sx={{
    // width:"130px",
 
    bgcolor: colors.blueAccent[500],
    color:colors.blueAccent[100],
  display:"flex",
    fontWeight: "bold",
    p: "10px 10px",
   
    
    transition: ".3s ease",
    ":hover": {
      bgcolor: colors.blueAccent[700], // Adjust the color for hover state if needed
    },
  }}
  onClick={() => {
    
    navigate(Redirect);
    
   
  }}
>
<Typography sx={{ display: "flex", whiteSpace: "nowrap" }}>
  {btn}
</Typography>

</Button>
    </div>
  )
}

export default AddButton
