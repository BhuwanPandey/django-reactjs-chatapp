import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";

function Message(props) {
  const { user, baseUrl: BE } = useContext(AuthContext);
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
        <img
          src={
            props.message.user_details.avatar
              ? BE + props.message.user_details.avatar
              : `https://i.pravatar.cc/300?img=${props.message.user_details.username.length}`
          }
          alt={props.message.user_details.username + "_image"}
        />
        <span>{format(props.message.created_at)}</span>
      </div>
      <div className="chatMessageContent">
        <p>{props.message.message}</p>
      </div>
    </div>
    
  );
}

export default Message;
