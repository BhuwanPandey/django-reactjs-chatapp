import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

const INITIAL_STATE = {
  token:JSON.parse(localStorage.getItem("token")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [user,setUser] = useState();
  const url = "http://127.0.0.1:8000/auth/user/"

  useEffect(()=>{
    localStorage.setItem("token", JSON.stringify(state.token));
    const fetchuser = async () =>{
      try{
        const res = await axios.get(url,{
          headers:{
            'Authorization': `Token ${state.token.key}`,
            'content-type': 'application/json'
          }
        });
        setUser(res.data);
      }catch(err){
        console.log(err);
      }
    };
    if (state.token){
      fetchuser()
    }
  },[state.token])


  return (
    <AuthContext.Provider value={{ 
      user: user,
      token:state.token,
      isFetching: state.isFetching,
      error: state.error,
      dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};


