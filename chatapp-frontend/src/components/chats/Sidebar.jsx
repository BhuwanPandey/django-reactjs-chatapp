import React from 'react'
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

function Sidebar(props) {
  return (
    <div className='sidebar'> 
      <Navbar />
      <Search user_id = {props.user_id}/>
      <Chats/>
    </div>
  )
}

export default Sidebar