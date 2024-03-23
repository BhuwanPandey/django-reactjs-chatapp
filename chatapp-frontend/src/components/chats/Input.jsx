import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { InputContext } from "../../context/InputContext";
import Typewriter from 'typewriter-effect';
import {commonAction} from "../../common/sendaction";

function Input() {
  const [text, setText] = useState("");
  const { data, isfirst, socket, dispatch, messages, chat_name } =
    useContext(ChatContext);
  const { send, refresh, trigger } = useContext(InputContext);
  const {user} = useContext(AuthContext);
  const [typing,setTyping] = useState(false);
  const [otheruser,setOtherUser] = useState(null);


  if (socket && send) {
    let datas = data;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if(message.type === "typing" && user && message.username !== user.username){
        setTyping(true)
        setOtherUser(message.username)
        setTimeout(() => {
          setTyping(false)
        }, 5000); 
      }
      if(message.type === "chat_message"){
        const new_ = [...messages, message];
        if (isfirst) {
          datas = {
            chat_id: message.chat_id,
            display_name: data.display_name,
          };
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
    commonAction(text,chat_name,data,isfirst,socket,trigger)
    setTyping(false)
    setText("");
  };

  const handleEnter = (e) => {
    if(socket){
      const notify_typing = () =>{
        socket.send(JSON.stringify({chat_id:data.chat_id,type:"typing"}))
        trigger({ type: "SEND_MSG" });
      }
      !isfirst && notify_typing()
    }

    if (text.trim().length > 1 && e.code === "Enter") {
      commonAction(text,chat_name,data,isfirst,socket,trigger)
      setTyping(false)
      setText("");
    }
    e.code === "Enter" && setText("");
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
      {(data.chat_id || isfirst) && (
        <>
          <input
            type="text"
            placeholder="Type something..."
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={handleEnter}
            
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
