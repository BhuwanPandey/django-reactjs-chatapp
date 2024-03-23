import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { InputContext } from "../../context/InputContext";
import { get_message } from "../../common/messages";

function Chats() {
  const [chats, setChats] = useState([]);
  const { baseUrl,token } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { refresh } = useContext(InputContext);
  const [selectDiv,setselectDiv] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await axios.get(`${baseUrl}/auth/chats/`, {
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
    const get_messages = async () => {
      setselectDiv(u.display_name);
      const chatUrl = `${baseUrl}/auth/chats/${u.chat_id}/messagecollection/`;
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
      {chats &&
        chats.map((val, idx) => (
          <div
            className={`chatUser1 ${selectDiv === val.display_name ? 'selected' : ''}`}
            key={idx}
            onClick={(e) => handleSelect(val)}
          >
            <img
              src={
                val.chat_profile
                  ? baseUrl + val.chat_profile
                  : `https://i.pravatar.cc/300?img=${val.display_name[0].length}`
              }
              alt={`${val.display_name[0]}_img`}
            />
            <div className="chatuserInfo">
              <span>{val.display_name}</span>
              <p>{val.last_message}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;
