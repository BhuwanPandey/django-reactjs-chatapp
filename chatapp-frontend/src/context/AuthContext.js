import {
  createContext,
  useEffect,
  useReducer,
  useState,
  useContext,
} from "react";
import axios from "axios";
import { ChatContext } from "./ChatContext";

const INITIAL_STATE = {
  baseUrl: process.env.REACT_APP_BACKEND_API,
  token: JSON.parse(localStorage.getItem("token")) || null,
  users: [],
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        token: null,
        isFetching: true,
        error: false,
      };
    case "Users":
      return {
        ...state,
        users: action.payload.users,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        token: null,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [user, setUser] = useState();
  const { dispatch: trigger } = useContext(ChatContext);
  const url = `${state.baseUrl}/auth/user/`;

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
    const fetchuser = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Token ${state.token.key}`,
            "content-type": "application/json",
          },
        });
        setUser(res.data);
        const socket = new WebSocket(
          `${process.env.REACT_APP_CHAT_API}/ws/chat/?token=${state.token.key}`
        );
        trigger({ type: "SET_SOCKET", socket: socket });
      } catch (err) {
        console.log(err);
      }
    };
    if (state.token) {
      fetchuser();
    }
    return () => {
      if (state.token && trigger) {
        trigger({ type: "SET_SOCKET", socket: null }); // Remove socket from state or context
      }
    };
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        baseUrl: state.baseUrl,
        user: user,
        users: state.users,
        token: state.token,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
