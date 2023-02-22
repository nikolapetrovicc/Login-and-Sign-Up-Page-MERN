import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { IUser } from "../../interface/UserInterface";
import { Alert, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUpFormik = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState(false);
  const { loading } = useSelector((state: any) => state?.user);

  const handleCloseSnack = (reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const formik = useFormik<IUser>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required!"),
      lastName: Yup.string().required("Last name is required!"),
      email: Yup.string().email("Invalid email address!"),
      password: Yup.string().min(
        6,
        "Password must be at least 6 characters long!"
      ),
    }),

    onSubmit: (values) => {
      dispatch(loginStart());

      const { firstName, lastName, email, password } = values;
      axios
        .post("/auth/signup", {
          firstName,
          lastName,
          email,
          password,
        })
        .then(() => {
          axios
            .post("/auth/signin", {
              email,
              password,
            })
            .then((response) => {
              dispatch(loginSuccess(response.data));
              navigate("/");
            });
        })
        .catch(() => {
          dispatch(loginFailure());
          setOpenSnack(true);
        });
    },
  });

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
        <Typography variant="h5" sx={{ mb: 4 }}>
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="subtitle1">First Name *</Typography>
          <TextField
            required
            fullWidth
            name="firstName"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            helperText={
              Boolean(formik.touched.firstName && formik.errors.firstName) &&
              formik.errors.firstName
            }
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1">Last Name *</Typography>
          <TextField
            required
            fullWidth
            name="lastName"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            helperText={
              Boolean(formik.touched.lastName && formik.errors.lastName) &&
              formik.errors.lastName
            }
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1">Email</Typography>
          <TextField
            fullWidth
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={
              Boolean(formik.touched.email && formik.errors.email) &&
              formik.errors.email
            }
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle1">Password</Typography>
          <TextField
            fullWidth
            name="password"
            type="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={
              Boolean(formik.touched.password && formik.errors.password) &&
              formik.errors.password
            }
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{ mt: 2, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => handleCloseSnack()}
      >
        <Alert
          onClose={() => handleCloseSnack("error")}
          severity="error"
          sx={{ width: "100%" }}
        >
          Bad request!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUpFormik;
