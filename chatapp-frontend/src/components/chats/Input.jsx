import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { InputContext } from "../../context/InputContext";
import Typewriter from 'typewriter-effect';
import {commonAction} from "../../common/sendaction";
import InputEmoji from "react-input-emoji";


function Input() {
  const [text, setText] = useState("");
  const { chat_record, firstConnection, socket, dispatch, messages, chat_name } =
    useContext(ChatContext);
  const { refresh, trigger } = useContext(InputContext);
  const [reconnect,setReconnect] = useState(false);
  const {user,token} = useContext(AuthContext);
  const [typing,setTyping] = useState(false);
  const [otheruser,setOtherUser] = useState(null);
  const chat_id = chat_record && chat_record.chat_id;
  
  useEffect(()=>{
    if (socket) {
      socket.close();
    }
    const new_socket = new WebSocket(`${process.env.REACT_APP_CHAT_API}/ws/chat/?token=${token.key}`);
    dispatch({"type":"SET_SOCKET",socket:new_socket})
    return () => {
      if (socket) {
        socket.close();
      }
    };
  },[token,reconnect])

  if (socket) {
    let datas = chat_record;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if(message.type === "typing" && user && message.username !== user.username && message.chat_id === chat_id){
        setTyping(true)
        setOtherUser(message.username)
        setTimeout(() => {
          setTyping(false)
        }, 5000); 
      }
      if(message.type === "chat_message"){
        let new_ = [];
        if (firstConnection) {
          datas = {
            chat_id: message.chat_id,
            display_name: chat_record.display_name,
          };
          new_ = [...messages, message];
          setReconnect(()=>(!reconnect))
        }
        else if(message.chat_id === chat_id){
          new_ = [...messages, message];
        }
        else{
          new_ = messages
        }
        dispatch({
          type: "CHANGE_USER",
          payload: { chat_detail: datas, messages: new_ },
        });
        trigger({ type: "REFRESH", refresh: !refresh });
    };
      }
  }


  const handleSend = () => {
    commonAction(text,chat_name,chat_record,firstConnection,socket)
    setTyping(false)
    setText("");
  };

  const handleEnter = (e) => {
    if(socket){
      const notify_typing = () =>{
        socket.send(JSON.stringify({chat_id:chat_record.chat_id,type:"typing"}))
      }
      !firstConnection && notify_typing()
    }

  if(text.trim().length > 1 && e.code === "Enter") {
      commonAction(text,chat_name,chat_record,firstConnection,socket)
      setTyping(false)
      setText("");
    }
  };

  return (
    <div className="chatInputBase">
      <div className="typerMsg">
      {typing && <Typewriter
        className="typer"
        options={{
          strings: [otheruser && `${otheruser} is typing ...`],
          autoStart: true,
          loop: true,
          cursor: '',
        }}
      />}
      </div>
      
    <div className="chatInput">
      {(chat_record.chat_id || firstConnection) && (
        <>
            <InputEmoji
            value={text}
            onChange={setText}
            onKeyDown={handleEnter}
            maxLength={80}
            placeholder="Type a message"
          />
          <div className="chatSend">
            <button onClick={handleSend} disabled={text.trim().length < 1}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  );
}

export default Input;
