import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
}
  return (
    <div className='chatNavbar'>
      <span className="chatLogo">Messenger</span>
      <div className="chatUser">
        <img src="" alt="" />
        <span>{user.username[0].toUpperCase()+ user.username.slice(1)}</span>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
      </div>
    </div>
  )
}

export default Navbar