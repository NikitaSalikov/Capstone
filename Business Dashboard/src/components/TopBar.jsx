import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Menu, Avatar, Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const notifications = [
    { id: 1, title: "New comment on your post", imageUrl: "/path/to/image1.jpg" },
    { id: 2, title: "New like on your photo", imageUrl: "/path/to/image2.jpg" },
    { id: 3, title: "Friend request accepted", imageUrl: "/path/to/image3.jpg" },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#FFF', color: '#000', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'flex-end', paddingRight: '20px' }}>
        <IconButton
          color="inherit"
          aria-label="show new notifications"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={handleNotificationClick}
          sx={{ mr: 2 }}
        >
          <Badge badgeContent={notifications.length} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

       

        <IconButton component={Link} to="/" color="inherit">
          <LogoutIcon />
        </IconButton>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Box
  sx={{
    width: '300px',
    maxHeight: '400px',
    overflowY: 'auto',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  }}
>
  {notifications.map((notification, index) => (
    <Box
      key={notification.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        borderBottom: index !== notifications.length - 1 ? '1px solid #E0E0E0' : 'none',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#ECECEC',
        },
      }}
    >
      <Avatar alt={notification.title} src={notification.imageUrl} sx={{ width: 40, height: 40, marginRight: 2 }} />
      <Typography variant="body1" sx={{ flexGrow: 1, color: '#333' }}>
        {notification.title}
      </Typography>
    </Box>
  ))}
</Box>

      </Menu>
    </AppBar>
  );
}

export default TopBar;
