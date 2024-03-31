import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { InputContext } from "../../context/InputContext";
import ChatUser from "./ChatUser";
import { get_message } from "../../common/messages";

function Chats() {
  const [chats, setChats] = useState([]);
  const { baseUrl, token, user } = useContext(AuthContext);
  const { refresh } = useContext(InputContext);
  const { onlineUsers: onlineuser,dispatch,divSelected } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/chats/`, {
          headers: {
            Authorization: `Token ${token.key}`,
          },
        });
        if (res.status === 200) {
          setChats(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    token.key && getChats();
  }, [token, refresh]);

  
  const handleSelect = (u) => {
    dispatch({
      type: "SELECT_DIV",
      divSelected:{name:u.display_name},
    });
    const get_messages = async () => {
      const chatUrl = `${baseUrl}/api/chats/${u.chat_id}/messagecollection/`;
      const res = await get_message(chatUrl, token.key);
      if (res.status === 200) {
        dispatch({
          type: "CHANGE_USER",
          payload: { chat_detail: u, messages: res.data },
        });
      }
    };
    u.chat_id && get_messages();
  };

  return (
    <div className="chatChats">
      {user &&
        chats.map((val, idx) =>
          onlineuser ? (
            <ChatUser
              key={idx}
              data={{ chat: val, url: baseUrl, token: token, user: user }}
              online={onlineuser.includes(val.display_name.toLowerCase())}
              select = {handleSelect}
              selectDiv = {divSelected}
            />
          ) : (
            <ChatUser
              key={idx}
              data={{ chat: val, url: baseUrl, token: token, user: user }}
              online={false}
              select = {handleSelect}
              selectDiv = {divSelected}
            />
          )
        )}
    </div>
  );
}

export default Chats;
