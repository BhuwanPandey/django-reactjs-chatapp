import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="chatNavbar">
      <span className="chatLogo">Messenger</span>
      <div className="chatUser">
        {/* <span>{user.username[0].toUpperCase() + user.username.slice(1)}</span> */}
        <img src={user.avatar ? user.avatar : `https://i.pravatar.cc/300?img=${user.id}`} alt="" className="topbarImg"/>
      </div>
    </div>
  );
}

export default Navbar;
