import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const CancelLink = ({ Hyperbtntext,hyperLinkText}) => {  // Accept textbtn as a prop
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={hyperLinkText}    
      style={{
        textDecoration: 'none',
      }}
    >
    
        <Typography
          variant="button"
          color="secondary"
          style={{
            display: 'inline-block',
            fontWeight: 500,
            cursor: 'pointer',
            textDecoration: hovered ? 'underline' : 'none',  // Adds underline on hover
          }}
          onMouseEnter={() => setHovered(true)}   // When the mouse hovers over the text
          onMouseLeave={() => setHovered(false)}  // When the mouse leaves the text
        >
          {Hyperbtntext}  {/* Display the text passed as a prop */}
        </Typography>
     
    </Link>
  );
};

export default CancelLink;

