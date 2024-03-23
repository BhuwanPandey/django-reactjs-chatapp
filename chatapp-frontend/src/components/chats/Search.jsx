import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ChatContext } from "../../context/ChatContext";
import { get_message } from "../../common/messages";
import { useNavigate } from "react-router";

function Search(props) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { user: currentUser, token, baseUrl } = useContext(AuthContext);
  const newUrl = `${baseUrl}/auth/users/?username=`;
  const { dispatch } = useContext(ChatContext);

  const checkchat = async (
    currentuser_id,
    anotheruser_id,
    currentusername,
    anotherusername
  ) => {
    const chat_name =
      currentuser_id > anotheruser_id
        ? `${currentusername}_${anotherusername}_chat`
        : `${anotherusername}_${currentusername}_chat`;

    const baseUrl1 = `${baseUrl}/auth/chats/check_chat/`;
    const data = { chat_name: chat_name };
    const res = await axios.post(baseUrl1, data, {
      headers: {
        Authorization: `Token ${token.key}`,
        "content-type": "application/json",
      },
    });

    if (res.status === 200) {
      const chat_id = res.data.chat_id;
      const url = `${baseUrl}/auth/chats/${chat_id}/messagecollection/`;
      const res1 = await get_message(url, token.key);
      if (res1.status === 200) {
        dispatch({
          type: "CHANGE_USER",
          payload: { chat_detail: res.data, messages: res1.data },
        });
      }
    }
    if (res.status === 202) {
      let data = {
        display_name: anotherusername,
        chat_id: null,
        isfirst: true,
        chat_name: chat_name,
      };
      dispatch({ type: "SEARCH_USER", payload: data });
    }
  };

  // display chat message with params
  useEffect(() => {
    // check user exist or not
    const checkuser = async (user_id) => {
      try {
        const urll = `${baseUrl}/auth/userinfo/${user_id}/`;
        const res = await axios.get(urll);
        if (res.status === 200) {
          const username = res.data.username;
          if(username === currentUser.username){
            navigate("/chat")
            window.location.reload()
          }
          checkchat(
            currentUser.public_id,
            props.user_id,
            currentUser.username,
            username
          );
        }

      } catch (err) {
        navigate("/chat");
      }
    };
    currentUser && props.user_id && checkuser(props.user_id);
  }, [currentUser, props.chat_id]);

  const handleSearch = async () => {
    let searchUrl = newUrl + username;
    try {
      const res = await axios.get(searchUrl, {
        headers: {
          Authorization: `Token ${token.key}`,
        },
      });
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && username && handleSearch();
  };

  const handleClick = (u) => {
    setUsername("");
    setUser([]);

    checkchat(
      currentUser.public_id,
      u.public_id,
      currentUser.username,
      u.username
    );
  };
  const hideUser = () => {
    if (username.length < 1) {
      setUser([]);
    }
  };

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
      {err && <span style={{ color: "red" }}>User not found!</span>}
      {user &&
        user.map((u, idx) => (
          <div className="chatUser1" key={idx} onClick={() => handleClick(u)}>
            <img
              src={u.avatar || "https://i.pravatar.cc/300?img=1"}
              alt="search user"
            />
            <div className="chatuserInfo">
              <span>{u.username}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Search;
