import "./topbar.css";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DropDown from "../DropDown";
import { useLocation } from 'react-router-dom';

export default function Topbar() {
    const [show,setShow] = useState(false);
    const { user } = useContext(AuthContext);
    const PE = "http://localhost:3000/"
    const location = useLocation();

    const ischat = location.pathname.includes("/chat/")

    if (!user) {
        return <div>Loading...</div>;
    }

    const toggleDropDown = () =>{
        setShow(!show)
    }

    return (
    <div className="topbarContainer">
        <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">ChatApp</span>
        </Link>
        </div>
        <div className="topbarCenter">
            {!ischat
            &&     
            <div className="searchbar">
                <Search className="searchIcon" />
                <input
                placeholder="Search for friend, post or video"
                className="searchInput"
                />
            </div>
            }
            </div>
        <div className="topbarRight">
        <span onClick={toggleDropDown}>
            <img
            src={
                user.avatar
                ? user.avatar
                : PE+"person/other.jpg"
            }
            alt=""
            className="topbarImg"
            />
        </span>
        {show && <DropDown />}
        </div>
    </div>
    );
    }
