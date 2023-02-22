import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";

const Home = () => {
  const { currentUser } = useSelector((state: any) => state?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome {currentUser?.firstName} {currentUser?.lastName}
          </Typography>
          <Button onClick={handleClickLogout} variant="contained">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Home;
