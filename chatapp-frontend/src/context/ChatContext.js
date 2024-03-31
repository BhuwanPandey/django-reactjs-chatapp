import { createContext, useEffect, useReducer, useState } from "react";

const INITIAL_STATE = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  messages: [],
  chat: {},
  chat_name: null,
  isfirst: false,
  onlineUsers: null,
};

export const ChatContext = createContext(INITIAL_STATE);

const chatReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_USER":
      return {
        ...state,
        chat: action.payload.chat_detail,
        chat_name: null,
        isfirst: false,
        messages: action.payload.messages,
      };
    case "SEARCH_USER":
      return {
        ...state,
        chat: {
          display_name: action.payload.display_name,
          chat_id: action.payload.chat_id,
        },
        chat_name: action.payload.chat_name,
        messages: [],
        isfirst: action.payload.isfirst,
      };
    case "Online_USER":
      return {
        ...state,
        onlineUsers: action.onlineusers,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.socket,
      };
    case "SELECT_DIV":
      return {
        ...state,
        divSelected: action.divSelected.name,
      };
    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  const [online, setOnlineUser] = useState(null);
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.socket) {
      state.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "onlineUser") {
          setOnlineUser(message.onlineuser);
        }
      };
    }
  }, [state.socket]);
  return (
    <ChatContext.Provider
      value={{
        chat_record: state.chat,
        chat_name: state.chat_name,
        messages: state.messages,
        firstConnection: state.isfirst,
        socket: state.socket,
        send: state.send,
        onlineUsers: online,
        divSelected: state.divSelected,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
