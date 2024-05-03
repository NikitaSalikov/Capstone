import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginInfo.username.trim()) newErrors.username = "Username is required";
    if (!loginInfo.password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Placeholder for authentication logic
      navigate("/home");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "lightGrey",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: "1200px",
          height: "80%",
          bgcolor: "background.paper",
        }}
      >
        {/* Image Section */}
        <CardMedia
          component="img"
          image="loginImage.jpeg" // Update with your image path
          alt="Login visual"
          sx={{
            display: { xs: "none", sm: "block" },
            width: { sm: "40%", md: "50%" },
            objectFit: "cover",
          }}
        />

        {/* Login Form Section */}
        <CardContent
          sx={{
            width: { xs: "100%", sm: "60%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": { m: 1, width: "100%", maxWidth: "400px" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <Typography
              variant="h4"
              gutterBottom
              textAlign="center"
              color="primary.main"
            >
              Hello Business!
            </Typography>

            <TextField
              className="input"
              label="Username"
              variant="outlined"
              name="username"
              value={loginInfo.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              style={{ marginBottom: "10px" }}
            />

            <TextField
              style={{ marginBottom: "10px" }}
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginInfo.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
