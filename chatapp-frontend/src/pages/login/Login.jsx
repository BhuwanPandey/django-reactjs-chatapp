// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// // import { signInWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "../firebase";

// const Login = () => {
//   const [err, setErr] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target[0].value;
//     const password = e.target[1].value;

//     try {
//       // await signInWithEmailAndPassword(auth, email, password);
//       navigate("/")
//     } catch (err) {
//       setErr(true);
//     }
//   };
//   return (
//     <div className="formContainer">
//       <div className="formWrapper">
//         <span className="logo">Lama Chat</span>
//         <span className="title">Login</span>
//         <form onSubmit={handleSubmit}>
//           <input type="email" placeholder="email" />
//           <input type="password" placeholder="password" />
//           <button>Sign in</button>
//           {err && <span>Something went wrong</span>}
//         </form>
//         <p>You don't have an account? <Link to="/register">Register</Link></p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import axios from "axios";
import { useContext, useRef } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";


const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const newUrl = "http://127.0.0.1:8000/auth/login/";
    const res = await axios.post(newUrl, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export default function Login() {
  const username = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ChatApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Chat@pp.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              type="text"
              required
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                "Loading..."
              ) : (
                "Log In"
              )}
            </button>
            <Link to={`/register/`}>
              <button className="loginRegisterButton" disabled={isFetching}>
                  Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}