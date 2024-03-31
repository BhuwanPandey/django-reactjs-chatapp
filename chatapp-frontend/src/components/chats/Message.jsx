import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";
import { Link } from "react-router-dom";


function Message(props) {
  const { baseUrl: BE,user } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.message]);

  return (
    <div
      ref={ref}
      className={`chatMessage ${
        props.message.user_details.username === user.username && "owner"
      }`}
    >
      <div className="chatMessageInfo">
      <Link to={`/profile/${props.message.user_details.username}`} style={{ textDecoration: "none" }}>
        <img
          src={
            props.message.user_details.avatar
              ? BE + props.message.user_details.avatar
              : `https://i.pravatar.cc/300?img=${props.message.user_details.id}`
          }
          alt={props.message.user_details.username + "_image"}
          
        />
        </Link>
        <span style={{fontSize:"11px",padding:"10px 0"}}>{format(props.message.created_at)}</span>
      </div>
      <div className="chatMessageContent">
        <p>{props.message.message}</p>
      </div>
    </div>
    
  );
}

export default Message;
