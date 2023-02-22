import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";

function App() {
  const { currentUser } = useSelector((state: any) => state?.user);

  //I also created a Login page, but I don't use this because it's not in the assignment

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/home" /> : <Navigate to="/register" />
          }
        />
        <Route
          path="/home"
          element={currentUser ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          path="/register"
          element={!currentUser ? <SignUp /> : <Navigate to="/" />}
        />
        {/* <Route
          path="/login"
          element={!currentUser ? <SignIn /> : <Navigate to="/" />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
