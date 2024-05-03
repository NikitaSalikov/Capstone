import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const sidebarWidth = 270;

function LocationCard({ name, address, imageUrl, onClick }) {
  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Softer shadow
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.15)', // Slightly more pronounced on hover for a subtle effect
        },
        borderRadius: '10px', // Rounded corners for a softer look
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        sx={{ height: 140, objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} // Rounded corners on the image
        image={imageUrl}
        alt={`Image of ${name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function LocationsGrid() {
  const navigate = useNavigate();

  // Sample locations for demonstration
  const locations = [
    {
      name: "Tempe",
      address: "123 Tempe St, Arizona",
      imageUrl: "Tempe.jpeg",
      description: "Tempe is a vibrant urban oasis in Metropolitan Phoenix. Home to Arizona State University, known for its warm weather and recreational activities.",
      additionalInfo: "Tempe Town Lake is a popular spot for kayaking, paddleboarding, and enjoying the Arizona sun."
    },
    {
      name: "New York",
      address: "456 New York Ave, New York",
      imageUrl: "NewYork.webp",
      description: "New York City is bustling with energy, culture, and iconic landmarks. Known as the Big Apple, it's home to Central Park, Broadway, and Times Square.",
      additionalInfo: "Don't miss the chance to visit the Statue of Liberty and Empire State Building for breathtaking views."
    },
    {
      name: "Los Angeles",
      address: "789 Los Angeles Rd, California",
      imageUrl: "losAngeles.jpeg",
      description: "Los Angeles, the City of Angels, is famous for Hollywood, beautiful beaches, and its diverse culinary scene.",
      additionalInfo: "Explore the Griffith Observatory and Hollywood Walk of Fame, and enjoy shopping on Rodeo Drive."
    },
    {
      name: "Washington",
      address: "101 Washington Circle, DC",
      imageUrl: "dc.jpeg",
      description: "Washington, D.C., the U.S. capital, is a compact city on the Potomac River, bordering the states of Maryland and Virginia.",
      additionalInfo: "It's known for its neoclassical monuments and buildings, including the iconic ones that house the federal government's 3 branches."
    },
    {
      name: "Tempe",
      address: "123 Tempe St, Arizona",
      imageUrl: "Tempe.jpeg",
      description: "Tempe is a vibrant urban oasis in Metropolitan Phoenix. Home to Arizona State University, known for its warm weather and recreational activities.",
      additionalInfo: "Tempe Town Lake is a popular spot for kayaking, paddleboarding, and enjoying the Arizona sun."
    },
    {
      name: "New York",
      address: "456 New York Ave, New York",
      imageUrl: "NewYork.webp",
      description: "New York City is bustling with energy, culture, and iconic landmarks. Known as the Big Apple, it's home to Central Park, Broadway, and Times Square.",
      additionalInfo: "Don't miss the chance to visit the Statue of Liberty and Empire State Building for breathtaking views."
    },
    {
      name: "Los Angeles",
      address: "789 Los Angeles Rd, California",
      imageUrl: "losAngeles.jpeg",
      description: "Los Angeles, the City of Angels, is famous for Hollywood, beautiful beaches, and its diverse culinary scene.",
      additionalInfo: "Explore the Griffith Observatory and Hollywood Walk of Fame, and enjoy shopping on Rodeo Drive."
    },
    {
      name: "Washington",
      address: "101 Washington Circle, DC",
      imageUrl: "dc.jpeg",
      description: "Washington, D.C., the U.S. capital, is a compact city on the Potomac River, bordering the states of Maryland and Virginia.",
      additionalInfo: "It's known for its neoclassical monuments and buildings, including the iconic ones that house the federal government's 3 branches."
    },
  ];

  const handleCardClick = (location) => {
    navigate(`/locations/${location.name}`, { state: { location } });
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      mt: 3, 
      pr: 3, 
      pl: { sm: `${sidebarWidth}px` }, 
      overflow: 'hidden', 
      backgroundColor: '#F9F7F7' // Using a very light background color
    }}>
      <Grid container spacing={3}>
        {locations.map((location, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <LocationCard
              name={location.name}
              address={location.address}
              imageUrl={location.imageUrl}
              onClick={() => handleCardClick(location)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

