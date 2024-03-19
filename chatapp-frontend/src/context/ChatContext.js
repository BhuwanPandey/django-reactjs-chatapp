import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState
  } from "react";
import axios from "axios";

const INITIAL_STATE = {
  token:JSON.parse(localStorage.getItem("token")) || null,
  messages:[],
  chat: {},
  chat_name:null,
  isfirst:false,
  send:false
};


export const ChatContext = createContext();

const chatReducer = (state, action) => {
  // console.log(action.payload)
  console.log("switch")
  console.log(action.payload)
  switch (action.type) {
    case "CHANGE_USER":
      return {
        chat: action.payload.chat_detail,
        chat_name:null,
        isfirst:false,
        // token:action.payload.token,
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
        case "MSG_SEND":
          return {
            chat:action.payload.data,
            isfirst:action.payload.isfirst,
            messages:action.payload.messages,
            send:true
          }
    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  // const [chats,setChats] = useState();
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


// export const Inputtrigger = createContext();


// const triggerReducer = (state, action) => {
//   switch (action.type) {
//     case "MSG_SEND":
//       return {
//         send:true
//       };
//     default:
//       return state;
//   }
// };

// export const InputtriggerContext = ({ children }) => {
//   const [state, dispatch] = useReducer(triggerReducer, INITIAL_STATE);

//     return (
//       <ChatContext.Provider value={{ 
//         send : state.send,
//         dispatch }}>
//         {children}
//       </ChatContext.Provider>
//     );
//   };