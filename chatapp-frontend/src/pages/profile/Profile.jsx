import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, token, baseUrl: url } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const username = useParams().username;
  const fullname = useRef();
  const aboutme = useRef();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${url}/auth/users/${username}/`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const name =
    user.username && user.username[0].toUpperCase() + user.username.slice(1);
  const str =
    user.about ||
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum saepe facilis numquam, ipsa, sit, omnis nam nihil blanditiis recusandae minus quaerat! Dignissimos, animi dolorem reiciendis tenetur distinctio minus. Nam, officiis.";

  const handleClick = (e) => {
    e.preventDefault();
    const update = async () => {
      const newUrl = `${url}/auth/user/`;
      try {
        const formData = new FormData();
        if (fullname.current.value) {
          formData.append("fullname", fullname.current.value);
        }
        if (aboutme.current.value) {
          formData.append("about", aboutme.current.value);
        }
        if (file) {
          formData.append("avatar", file);
        }
        const res = await axios.put(newUrl, formData, {
          headers: {
            Authorization: `Token ${token.key}`,
          },
        });
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (err) {
        alert("Something went Wrong!");
      }
    };
    update();
  };

  return (
    <>
      <Topbar />
      <div className="profilePage">
        <div className="profiledashboard">
          <div className="profiledetail">
            <div className="imageContainer">
              <img
                src={
                  user.avatar ? user.avatar : `https://i.pravatar.cc/300?img=${user.id}`
                }
                alt=""
                className="userimage"
              />
              {
                user.username === currentUser.username
                ?
                <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
                :
                ''
              }
             

            </div>

            <p style={{ fontSize: "24px", margin: "9px 0" }}>
              User Information
            </p>
            <div>
              <span style={{ fontWeight: "700" }}>Name:</span>
              <span className="username">
                {name}{" "}
                {user.fullname ? (
                  <span style={{ fontWeight: "500" }}>({user.fullname})</span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div>
              <span style={{ fontWeight: "700" }}>About me: </span>
              <span className="about">
                {" "}
                {str.length > 50 ? str.substring(0, 50) + "..." : str}
              </span>
            </div>
          </div>
          <div className="formdetail">
            {user.username === currentUser.username ? (
              <form className="updateBox" onSubmit={handleClick}>
                <input
                  placeholder="Fullname"
                  type="text"
                  className="updateInput"
                  ref={fullname}
                />
                <textarea
                  ref={aboutme}
                  placeholder="Aboutme"
                  cols="30"
                  rows="5"
                  className="updateInput"
                ></textarea>
                <div className="btnDiv">
                  <button className="updateBtn" type="submit">
                    Edit User{" "}
                  </button>
                </div>
              </form>
            ) : (
              <div className="chatBtn">
                <Link to={`/chat/user/${user.public_id}`} className="innerChatBtn">
                  Let's Chat
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
