import "./topbar.css";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DropDown from "../containers/DropDown";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Topbar() {
  const [show, setShow] = useState(false);
  const { user, token, baseUrl, dispatch } = useContext(AuthContext);
  const PE = "http://localhost:3000/";
  const location = useLocation();
  const [input, setInput] = useState("");
  const url = `${baseUrl}/auth/users/`;

  const ischat = location.pathname.includes("/chat/");
  const isprofile = location.pathname.includes("/profile/");

  if (!user) {
    return <div>Loading...</div>;
  }

  const toggleDropDown = () => {
    setShow(!show);
  };

  const fetchData = async (value) => {
    try {
      const res = await axios.get(url + "?username=" + value, {
        headers: {
          Authorization: `Token ${token.key}`,
        },
      });
      console.log(res.data, "search");
      dispatch({ type: "Users", payload: { users: res.data } });
    } catch (err) {
      console.log(err);
    }
    // };
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ChatApp</span>
        </Link>
      </div>
      <div className="topbarCenter">
        {ischat || isprofile ? (
          ""
        ) : (
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for user"
              className="searchInput"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="topbarRight">
        <span onClick={toggleDropDown}>
          <img
            src={user.avatar ? user.avatar : PE + "person/other.jpg"}
            alt=""
            className="topbarImg"
          />
        </span>
        {show && <DropDown />}
      </div>
    </div>
  );
}
