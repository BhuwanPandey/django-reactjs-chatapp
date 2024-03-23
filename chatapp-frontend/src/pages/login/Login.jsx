import axios from "axios";
import { useContext, useRef } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const loginCall = async (userCredential, dispatch, url) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const newUrl = `${url}/auth/login/`;
    const res = await axios.post(newUrl, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export default function Login() {
  const username = useRef();
  const password = useRef();
  const { isFetching, dispatch, baseUrl } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch,
      baseUrl
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
              {isFetching ? "Loading..." : "Log In"}
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
