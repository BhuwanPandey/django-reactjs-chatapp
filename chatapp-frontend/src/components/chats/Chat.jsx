import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className="userChat">
      <div className="userChatInfo">
        <span>
          {data.display_name &&
            data.display_name[0].toUpperCase() + data.display_name.slice(1)}
        </span>
        <div className="userChatIcons"></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
