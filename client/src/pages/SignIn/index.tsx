import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import axios from "axios";

//I created this Sign In, although this component is not part of the assignment
//I made this component without library

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickLogin = () => {
    dispatch(loginStart());
    const { email, password } = formData;
    axios
      .post("/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        dispatch(loginSuccess(response.data));
        navigate("/");
      })
      .catch(() => loginFailure());
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
          padding: 3,
          backgroundColor: "white",
          borderRadius: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Email Address</Typography>
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle1">Password</Typography>
          <TextField
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button onClick={handleClickLogin} fullWidth sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>

          <Link to="/register">Don't have an account? Sign Up</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
