import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import AuthContext from "./context/AuthContext";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import Homepage from "./pages/Homepage";
import NewBlogPage from "./pages/NewBlogPage";
import PostDetails from "./components/PostDetails";
import UpdateBlogForm from "./components/forms/UpdateBlogForm";

function App() {
  const { setCurrentUser } = useContext(AuthContext);

  axios.defaults.baseURL = "http://localhost:3005";
  if (localStorage.getItem("user")) {
    axios.defaults.headers.common = {
      authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
    };
  }

  useEffect(() => {
    axios
      .get("/user/getUser", {
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
            <Route path="/" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/homepage" element={<Homepage />}></Route>
            <Route path="/newBlog" element={<NewBlogPage />}></Route>
            <Route path="/postDetails/:id" element={<PostDetails />}></Route>
            <Route path="/updatePost" element={<UpdateBlogForm />}></Route>
          </Routes>
        </Router>
      </>
    </>
  );
}

export default App;
