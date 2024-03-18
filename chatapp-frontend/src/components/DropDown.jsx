import { Link } from "react-router-dom";
// import { useNavigate  } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


function DropDown() {
    const newUrl = "http://127.0.0.1:8000/auth/logout/";
    // const navigate = useNavigate ();
    const { user,token } = useContext(AuthContext);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleClick = async() =>{
        try {
            const res = await axios.post(newUrl,{},{
                headers:{
                'Authorization': `Token ${token.key}`,
                }
            });
            if (res.status === 200) {
                localStorage.removeItem("token");
                window.location.href = "/login"
                // navigate not work properly
                // navigate("/login");
            } else {
                console.log('Logout was not successful, status code:', res.status);
            }
        } catch (err) {
            console.log(err);
            }
        }
    return (
    <div className="dropdown">
        <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
            <li>Profile</li>
        </Link>
        <li onClick={handleClick}>Logout</li>
    </div>
    );
}
export default DropDown
