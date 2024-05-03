// DashboardLayout.js
import React from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import TopBar from './TopBar';
import SidebarMenu from './SidebarMenu';

// Define the theme directly within this component
const theme = createTheme({
  palette: {
    background: {
      default: '#eceff1' // Your desired shade of grey
 
    
    },
  
  },
});

const DashboardLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This will apply the global styles including background color */}
      <TopBar />
      <SidebarMenu />
      <main style={{ marginTop: '25px', marginLeft: '10px' }}>
        {children}
      </main>  
    </ThemeProvider>
  );
};

export default DashboardLayout;
