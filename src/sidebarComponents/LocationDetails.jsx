// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Box, Typography, Card, Grid, CardMedia, CardContent, useTheme } from '@mui/material';

// function LocationDetails() {
//   const location = useLocation();
//   const { name, address, imageUrl, description, additionalInfo } = location.state.location;
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
        // p: 3,
        // ml: { sm: '270px' },
// width: { sm: `calc(100% - 270px)` },
// overflow: 'auto', // Adjust to 'auto' for scrolling if content exceeds viewport height
// backgroundColor: theme.palette.background.default,
//       }}
//     >
//       <Grid container spacing={3} alignItems="stretch">
//         <Grid item xs={12} md={7}> {/* Adjusted for a slightly larger image display */}
//           <Card
//             raised
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               boxShadow: 3,
//               borderRadius: 2, // Optional: Adjust border-radius for aesthetics
//             }}
//           >
//             <CardMedia
//               component="img"
//               image={`${process.env.PUBLIC_URL}/${imageUrl}`}
//               alt={`Image of ${name}`}
//               sx={{
//                 width: '100%',
//                 height: 'auto', // Adjust to 'auto' to maintain aspect ratio without cropping
//                 objectFit: 'contain',
//               }}
//             />
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={5}> {/* Adjusted to balance the layout */}
//           <Card
//             raised
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-around',
//               padding: theme.spacing(4), // Increased padding for more space inside the card
//               boxShadow: 3,
//               borderRadius: 2, // Optional: Adjust border-radius for aesthetics
//             }}
//           >
//             <CardContent>
//               <Typography gutterBottom variant="h2" component="div" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, marginBottom: theme.spacing(2) }}>
//                 {name}
//               </Typography>
//               <Typography variant="h6" color="text.secondary" sx={{ marginBottom: theme.spacing(2) }}>
//                 Address: {address}
//               </Typography>
//               <Typography variant="body1" sx={{ marginBottom: theme.spacing(1) }}>
//                 {description}
//               </Typography>
//               <Typography variant="body1">
//                 {additionalInfo}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default LocationDetails;

import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, useTheme, Container, CardMedia } from "@mui/material";

function LocationDetails() {
  const location = useLocation();
  const { name, address, imageUrl, description, additionalInfo } =
    location.state.location;
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        p: 3,
        ml: { sm: '270px' },
        width: { sm: `calc(100% - 270px)` },
        overflow: "auto", 
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          {name}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          Address: {address}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        image={`${process.env.PUBLIC_URL}/${imageUrl}`}
        alt={`Image of ${name}`}
        sx={{
          borderRadius: 2,
          width: "100%",
          height: "auto",
          objectFit: "contain",
          mb: 4,
        }}
      />
      <Typography variant="body1" paragraph sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Typography variant="body1" paragraph>
        {additionalInfo}
      </Typography>
    </Container>
  );
}

export default LocationDetails;
