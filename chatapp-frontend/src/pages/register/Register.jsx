// import React, { useState } from "react";
// // import Add from "../img/addAvatar.png";
// // import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// // import { auth, db, storage } from "../firebase";
// // import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// // import { doc, setDoc } from "firebase/firestore";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//   const [err, setErr] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     const displayName = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const file = e.target[3].files[0];

//   }
//   return (
//     <div className="formContainer">
//       <div className="formWrapper">
//         <span className="logo">Lama Chat</span>
//         <span className="title">Register</span>
//         <form onSubmit={handleSubmit}>
//           <input required type="text" placeholder="display name" />
//           <input required type="email" placeholder="email" />
//           <input required type="password" placeholder="password" />
//           <input required style={{ display: "none" }} type="file" id="file" />
//           <label htmlFor="file">
//             <span>Add an avatar</span>
//           </label>
//           <button disabled={loading}>Sign up</button>
//           {loading && "Uploading and compressing the image please wait..."}
//           {err && <span>Something went wrong</span>}
//         </form>
//         <p>
//           You do have an account? <Link to="/register">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;




import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useNavigate  } from "react-router";
import { Link } from "react-router-dom";


export default function Register() {
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate ();
  const [passwordmismatch,setPassword] = useState(false);

  const handleClick = async (e) => {
    const newUrl = "http://127.0.0.1:8000/auth/registration/";
    setPassword(false);
    const password_ = password.current.value
    const passwordAgain_ = passwordAgain.current.value
    
    e.preventDefault();

    if (passwordAgain_ !== password_) {
      setPassword(true)
    } else {
      const user = {
        username: username.current.value,
        password1: password_,
        password2: passwordAgain_
      };
      try {
        
        await axios.post(newUrl, user,{
          headers:{
            "content-type":"application/json"
          }
        });
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ChatApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Chat@pp
          </span>
        </div>
        <div className="loginRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            {passwordmismatch && <span style={{color:"red",textAlign:"center"}}>Password didnot Match</span>}
            <button className="loginButton" type="submit" >
              Sign Up
            </button>
            <Link to={`/login/`}>
              <button className="loginRegisterButton" >Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
