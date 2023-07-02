import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios";
import './App.css'
import AuthContext from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const { setCurrentUser } = useContext(AuthContext);

  if (localStorage.getItem("user")) {
    axios.defaults.baseURL = 'http://localhost:3005';
    axios.defaults.headers.common = {
      authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    };
  }

  useEffect(() => {
    axios
      .get("/user/getUser", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  });
  return (
    <>
       <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} ></Route>
          <Route path="/register" element={<RegisterForm />} ></Route>
        </Routes>
      </Router>
    </>
    </>
  )
}

export default App
