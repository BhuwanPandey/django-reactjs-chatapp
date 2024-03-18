import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import Message from './Message'
import axios from "axios";



function Messages() {
  // const [messages, setMessages] = useState([]);
  // const { token } = useContext(AuthContext);
  const { data,messages } = useContext(ChatContext);
  
  // useEffect(() => {
  //   const get_message = async() =>{
  //     const baseUrl = `http://127.0.0.1:8000/auth/chats/${data.chat_id}/messagecollection/`
  //     const res = await axios.get(baseUrl,{
  //       headers:{
  //         "Authorization":`Token ${token.key}`
  //       }
  //     }
  //     )
  //     if (res.status === 200){
  //       setMessages(res.data);
  //     }
  //   }
  //   data.chat_id && get_message()
  // }, [data.chat_id,token]);
  return (
    <div className="chatMessages">
      {
        data.chat_id ?
      
        messages.map((m,idx) => (
          <Message message={m} key={idx} />
        ))

        :

        <div className="chatWelcomeMessage">
        <p>
          Let'<span style={{color:"red"}}>s</span> Start Chat
        </p>
      </div>

      }
    </div>
  )
}

export default Messages