import {
    createContext,
    useReducer,
    useEffect,
    useState
  } from "react";

const INITIAL_STATE = {
  token:JSON.parse(localStorage.getItem("token")) || null,
  messages:[],
  chat: {},
  chat_name:null,
  isfirst:false
};



export const ChatContext = createContext();

const chatReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_USER":
      return {
        chat: action.payload.chat_detail,
        chat_name:null,
        isfirst:false,
        messages:action.payload.messages,
        send:false
      };
      case "SEARCH_USER":
        return {
          chat:{
            display_name:action.payload.display_name,
            chat_id:action.payload.chat_id
          },
          chat_name:action.payload.chat_name,
          // token:action.payload.token,
          messages:[],
          isfirst:action.payload.isfirst,
          send:false
        };
    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  const [socke,setSoc] = useState();
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    useEffect(()=>{
      
      const socketconnection = () =>{
      const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/?token=${state.token.key}`);
      setSoc(socket)
      }
      if (state.token){
        socketconnection()
      }
    },[state.token])
    return (
      <ChatContext.Provider value={{ 
        data:state.chat,
        chat_name:state.chat_name,
        messages:state.messages,
        isfirst:state.isfirst,
        socket:socke,
        send:state.send,
        dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };

