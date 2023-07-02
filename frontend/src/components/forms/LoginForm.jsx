import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("/user/login", JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setError("");
        setCurrentUser(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.token));
        navigate("/homepage");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.error);
      });
  }

  return (
    <section className="login">
      <div className="login__wrapper">
        <h2>Login</h2>
        {error && <div className="error"> {error} </div>}
        <form onSubmit={handleSubmit} className="form__wrapper">
          <input
            type="text"
            name="username"
            placeholder="Username"
            ref={usernameRef}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="on"
            ref={passwordRef}
            required
          />
          <button type="submit">Log in</button>
          <p>
            Need an account?{" "}
            <Link to="/register" className="form__link">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
