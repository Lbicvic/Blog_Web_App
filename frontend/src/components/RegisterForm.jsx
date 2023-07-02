import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const RegisterForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };

    axios
      .post("/user/register", JSON.stringify(user), {
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
    <section className="register-form">
      <div className="register-form__wrapper">
        <h2>Register</h2>
        {error && <div className="error"> {error} </div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            ref={usernameRef}
            required
          />
           <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="on"
            ref={emailRef}
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
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <Link to="/" className="form__link">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
