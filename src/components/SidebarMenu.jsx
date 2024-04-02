// import React, { useState } from 'react';
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import MailIcon from '@mui/icons-material/Mail';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SettingsIcon from '@mui/icons-material/Settings';
// import PersonIcon from '@mui/icons-material/Person';
// import { Link } from 'react-router-dom';

// function SidebarMenu() {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);

//   // Custom color palette
//   const colors = {
//     lightGrey: '#98ABEE',  //
//     lightBlue: '#201658', //
//     mediumBlue: '#3F72AF', //
//     darkBlue: '#F9E8C9', // sidebar text/icons color
//   }; 

//   return (
//     <Drawer
//       variant="persistent"
//       anchor="left"
//       open={isSidebarOpen}
//       onClose={toggleDrawer(false)}
//       sx={{
//         '& .MuiDrawer-paper': {
//           width: 270,
//           boxSizing: 'border-box',
//           background: colors.lightBlue, // Light blue background
//           color: colors.darkBlue, // Dark blue text
//         },
//       }}
//     >
//       <Avatar
//         sx={{
//           bgcolor: colors.mediumBlue, // Medium blue avatar background
//           width: 150,
//           height: 150,
//           "& svg": { fontSize: 90 },
//           margin: 'auto',
//           marginTop: 13,
//           marginBottom: 2,
//         }}
//       >
//         <PersonIcon />
//       </Avatar>
//       <Typography variant="h6" sx={{ mt: 1, mb: 5, textAlign: 'center', color: colors.darkBlue }}>Admin Name</Typography>
//       <List>
//         <ListItem button key="Home" component={Link} to="/home">
//           <ListItemIcon><HomeIcon sx={{ color: colors.darkBlue }} /></ListItemIcon>
//           <ListItemText primary="Home" sx={{ color: colors.darkBlue }} />
//         </ListItem>
//         <ListItem button key="Messages" component={Link} to="/messages">
//           <ListItemIcon><MailIcon sx={{ color: colors.darkBlue }} /></ListItemIcon>
//           <ListItemText primary="Messages" sx={{ color: colors.darkBlue }} />
//         </ListItem>
//         <ListItem button key="Locations" component={Link} to="/locations">
//           <ListItemIcon><LocationOnIcon sx={{ color: colors.darkBlue }} /></ListItemIcon>
//           <ListItemText primary="Locations" sx={{ color: colors.darkBlue }} />
//         </ListItem>
//         <ListItem button key="Settings" component={Link} to="/settings">
//           <ListItemIcon><SettingsIcon sx={{ color: colors.darkBlue }} /></ListItemIcon>
//           <ListItemText primary="Settings" sx={{ color: colors.darkBlue }}/>
//         </ListItem>
//       </List>
//     </Drawer>
//   );

//   function toggleDrawer(open) {
//     return (event) => {
//       if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//         return;
//       }
//       setSidebarOpen(open);
//     };
//   }
// }

// export default SidebarMenu;




import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink, useLocation } from 'react-router-dom';

function SidebarMenu() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation(); // This hook returns the current location object
  const theme = useTheme();

  // Custom color palette
  const colors = {
    lightGrey: '#98ABEE',
    lightBlue: '#201658',
    mediumBlue: '#3F72AF',
    darkBlue: '#F9E8C9', // Considered as active icon/text color
    inactiveGrey: '#A9A9A9', // Inactive icon/text color
  };

  // Function to check if the route is active
  const isActiveRoute = (path) => location.pathname === path;

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isSidebarOpen}
      onClose={() => toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: 270,
          boxSizing: 'border-box',
          background: colors.lightBlue,
          color: colors.darkBlue,
        },
      }}
    >
      <Avatar
        sx={{
          bgcolor: colors.mediumBlue,
          width: 150,
          height: 150,
          "& svg": { fontSize: 90 },
          margin: 'auto',
          marginTop: 13,
          marginBottom: 2,
        }}
      >
        <PersonIcon />
      </Avatar>
      <Typography variant="h6" sx={{ mt: 1, mb: 5, textAlign: 'center', color: colors.darkBlue }}>Admin Name</Typography>
      <List>
        {[
          { text: 'Home', icon: <HomeIcon />, path: '/home' },
          { text: 'Messages', icon: <MailIcon />, path: '/messages' },
          { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              color: isActiveRoute(item.path) ? colors.darkBlue : colors.inactiveGrey,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '& .MuiListItemIcon-root': {
                color: 'inherit', // This ensures icon color inherits from ListItem
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  function toggleDrawer(open) {
    return () => {
      setSidebarOpen(open);
    };
  }
}

export default SidebarMenu;
