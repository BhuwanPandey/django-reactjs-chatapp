import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ChatContext } from "../../context/ChatContext";
import {get_message} from "../../common/messages";


function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [err, setErr] = useState(false);
  const { user:currentUser,token } = useContext(AuthContext);
  const newUrl = "http://127.0.0.1:8000/auth/users/?username=";
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    let searchUrl = newUrl+username;
    try {
      const res = await axios.get(searchUrl,{
        headers:{
          "Authorization":`Token ${token.key}`
        }
      }
      )
      if (res.status === 200){
        // console.log(res.data)
        setUser(res.data)
        // res.data.forEach((data) => {
        //   setUser(data);
        // });
      }
    } catch (err) {
      console.log(err)
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && username && handleSearch();
  };

  const handleClick = (u) =>{
    setUsername("")
    setUser([])
    const chat_name = currentUser.public_id > u.public_id ? `${currentUser.username}_${u.username}_chat`:
    `${u.username}_${currentUser.username}_chat`;
    const baseUrl1 = "http://127.0.0.1:8000/auth/chats/check_chat/"

    // write logic here
    const checkchat = async () =>{
      const data = {chat_name:chat_name}
      const res = await axios.post(baseUrl1,data,{
        headers:{
          'Authorization': `Token ${token.key}`,
          'content-type': 'application/json'
        }
      });
      if (res.status === 200){
        const chat_id = res.data.chat_id
        const url = `http://127.0.0.1:8000/auth/chats/${chat_id}/messagecollection/`
        const res1 = await get_message(url,token.key)
        if (res1.status === 200){
          dispatch({ type: "CHANGE_USER", payload:{chat_detail:res.data,messages:res1.data} });
        }
        // dispatch({ type: "CHANGE_USER", payload: {chat_detail:u,messages:res.data} });

      }
      if (res.status === 202){
        let data = {display_name:u.username,chat_id:null,isfirst:true,chat_name:chat_name}
        dispatch({ type: "SEARCH_USER", payload: data });
      }
  };

    checkchat()

    // dispatch({ type: "SEARCH_USER", payload: data });
  }
  const hideUser = () =>{
    if(username.length < 1){
      setUser([])
    }
  }

  return (
    <div className="chatSearch">
      <div className="chatSearchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onKeyUpCapture={hideUser}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span style={{color:"red"}}>User not found!</span>}
      {user && 
      user.map((u,idx)=>(
        <div className="chatUser1" key={idx} onClick={()=>handleClick(u)}>
          <img src={u.avatar || "https://i.pravatar.cc/300?img=1"} alt="search user" />
          <div className="chatuserInfo">
            <span>{u.username}</span>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default Search