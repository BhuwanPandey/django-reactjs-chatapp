import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";

function Chat() {
  const { chat_record } = useContext(ChatContext);
  return (
    <div className="userChat">
      <div className="userChatInfo">
        <span style={{fontWeight:"700"}}>
          {chat_record.display_name &&
            chat_record.display_name[0].toUpperCase() + chat_record.display_name.slice(1)}
        </span>
        <div className="userChatIcons"></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
