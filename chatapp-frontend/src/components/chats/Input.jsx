import React, { useContext, useState,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

import axios from "axios";



function Input() {
  const [text, setText] = useState("");
  // const { user,token } = useContext(AuthContext);
  const { data,isfirst,socket,dispatch,messages,chat_name,send } = useContext(ChatContext);

  if (socket && send){
    let datas = data;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const new_ = [...messages,message]
      console.log(datas)
      if(isfirst){
        datas = {
          "chat_id":message.chat_id,
          "display_name":data.display_name
        }
      }
      dispatch({ type: "CHANGE_USER", payload: {chat_detail:datas,messages:new_} });
    }
  }
  const handleSend = () => {
    const firstconnection = {
      type:"chat_begin",
      message:text,
      chat_name:chat_name,
      user:data.display_name
    }
    const input = {
      type:"chat_message",
      message:text,
      chat_id:data.chat_id,
    }
   
    isfirst?socket.send(JSON.stringify(firstconnection)):socket.send(JSON.stringify(input))
    dispatch({ type: "MSG_SEND",payload:{data:data,isfirst:isfirst,messages:messages}});
    setText("");

  }
const handleEnter = (e) =>{
  if (text.trim().length > 1 && e.code === "Enter"){
    const firstconnection = {
      type:"chat_begin",
      message:text,
      chat_name:chat_name,
      user:data.display_name
    }
    const input = {
      type:"chat_message",
      message:text,
      chat_id:data.chat_id,
    }
    isfirst?socket.send(JSON.stringify(firstconnection)):socket.send(JSON.stringify(input))
    dispatch({ type: "MSG_SEND",payload:{data:data,isfirst:isfirst,messages:messages}});
    setText("");


  }
  e.code === "Enter" && setText("");
}
  return (
    <div className="chatInput">
      {
        (data.chat_id || isfirst) && 
      <>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleEnter}
      />
      <div className="chatSend">
      <img src="/img/img.png" alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
        <img src="/img/attach.png" alt="" />
        </label>
        <button onClick={handleSend} disabled={text.trim().length < 1} >Send</button>
      </div>
      </>

    }
  </div>
  )
}

export default Input