import React, { useState } from 'react';
import { Box, TextField, Button, InputAdornment, IconButton, Avatar, Paper, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';



function AccountSettings() {
    const [userInfo, setUserInfo] = useState({
        username: 'John',
        email: 'johndoe@example.com',
        password: '********', // Display placeholder
        profilePicture: null,
    });

    const [editing, setEditing] = useState({
        username: false,
        email: false,
        password: false,
    });

    const [editableValues, setEditableValues] = useState({
        username: 'John',
        email: 'johndoe@example.com',
        password: 'password123', // Example plaintext password for editing
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setUserInfo(prevState => ({
            ...prevState,
            profilePicture: URL.createObjectURL(file),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserInfo(prevState => ({
            ...prevState,
            username: editableValues.username,
            email: editableValues.email,
            password: '********',
        }));
        setEditing({
            username: false,
            email: false,
            password: false,
        });
        alert('Information updated!');
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 500, m: 'auto', p: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar src={userInfo.profilePicture} alt="Profile" sx={{ width: 100, height: 100, mb: 1 }} />
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleProfilePictureChange} />
                    <PhotoCamera />
                </IconButton>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {['username', 'email', 'password'].map((field, index) => (
                        <Grid item xs={12} key={field}>
                            <TextField
                                fullWidth
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                type={field === 'password' ? 'password' : 'text'}
                                name={field}
                                value={editing[field] ? editableValues[field] : userInfo[field]}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: field !== 'password' && (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setEditing(prevState => ({ ...prevState, [field]: !prevState[field] }))}>
                                                <EditIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                disabled={!editing[field]}
                                variant="outlined"
                                margin="dense"
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" type="submit">
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default AccountSettings;
