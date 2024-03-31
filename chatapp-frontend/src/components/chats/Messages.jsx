import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import Message from "./Message";

function Messages() {
  const { chat_record, messages } = useContext(ChatContext);
  return (
    <div className="chatMessages">
      {chat_record.chat_id ? (
        messages.map((m, idx) => <Message message={m} key={idx} />)
      ) : (
        <div className="chatWelcomeMessage">
          <p>
            Let'<span style={{ color: "red" }}>s</span> Start Chat
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
