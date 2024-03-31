import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router";

export default function Register() {
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const [error,setError] = useState(null);


  const handleClick = async (e) => {
    const registerUrl = `${process.env.REACT_APP_BACKEND_API}/auth/registration/`;
    setError(null);
    const password_ = password.current.value;
    const passwordAgain_ = passwordAgain.current.value;

    e.preventDefault();

    if (passwordAgain_ !== password_) {
      setError("Password didnot Match!")
    } else {
      const user = {
        username: username.current.value,
        password1: password_,
        password2: passwordAgain_,
      };
      try {
        await axios.post(registerUrl, user, {
          headers: {
            "content-type": "application/json",
          },
        });
        navigate("/login");
      } catch (err) {
        if(err.response.status === 400){
          setError("Bad Requests")
        }
        if(err.response.status === 500){
          setError("Something Went Wrong!")
        }
        
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
            {error && (
              <span style={{ color: "red", textAlign: "center" }}>
                {error}
              </span>
            )}
            <button className="loginButton" type="submit">
              Sign Up
            </button>
              <button className="loginRegisterButton" onClick={()=>{navigate("/login")}}>Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
