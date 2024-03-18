import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";


function Message(props) {
  const { user } = useContext(AuthContext);
  const BE = "http://127.0.0.1:8000"
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.message]);

  return (
    <div ref={ref} className={`chatMessage ${props.message.user_details.username === user.username && "owner"}`} >
      <div className="chatMessageInfo">
        <img src={
          props.message.user_details.avatar ?
          BE+ props.message.user_details.avatar:
          `https://i.pravatar.cc/300?img=1`
          } alt={props.message.user_details.username+"_image"} />
        <span>just now</span>
      </div>
      <div className="chatMessageContent">
        <p>{props.message.message}</p>
        {/* <img src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-min-an-675920.jpg&fm=jpg" alt="" /> */}
      </div>
    </div>
  )
}

export default Message