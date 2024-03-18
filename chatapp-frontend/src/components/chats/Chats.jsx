import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {get_message} from "../../common/messages";

function Chats() {
  const baseUrl = "http://127.0.0.1:8000/auth/chats/"
  const [chats, setChats] = useState([]);
  // const [messages, setMessages] = useState([]);
  const { token } = useContext(AuthContext);
  const { dispatch,send } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async() => {
      try {
        const res = await axios.get(baseUrl,{
          headers:{
            "Authorization":`Token ${token.key}`
          }
        }
        )
        if (res.status === 200){
          setChats(res.data);
        }
      } catch (err) {
        console.log(err)
        // setErr(true);
      }
    };

    token.key && getChats();
  }, [token,send]);

  const handleSelect = (u) => {
    const get_messages = async() =>{
      const baseUrl = `http://127.0.0.1:8000/auth/chats/${u.chat_id}/messagecollection/`
      // const res = await axios.get(baseUrl,{
      //   headers:{
      //     "Authorization":`Token ${token.key}`
      //   }
      // }
      // )
      const res = await get_message(baseUrl,token.key)
      if (res.status === 200){
        // setMessages(res.data);
        dispatch({ type: "CHANGE_USER", payload: {chat_detail:u,messages:res.data} });
      }
    }
    u.chat_id && get_messages()

  };

  return (

    <div className="chatChats">
    {
    chats &&
    chats.map((val,idx)=>(
      <div className="chatUser1" key={idx} onClick={() => handleSelect(val)}>
        <img src={val.chat_profile? "http://127.0.0.1:8000"+val.chat_profile :`https://i.pravatar.cc/300?img=${idx}`} alt={`${val.display_name[0]}_img`} />
        <div className="chatuserInfo">
          <span>{val.display_name}</span>
          <p>{val.last_message}</p>
        </div>
      </div>
    ))
    } 
  </div>
  )
}

export default Chats