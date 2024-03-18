import React from 'react'
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./style.css";
import Topbar from "../../components/topbar/Topbar";

function Dashboard() {
  return (
    <>
      <Topbar/>
      <div className="chatHome">
          <div className="chatContainer">
              <Sidebar/>
              <Chat/>
          </div>
      </div>
    </>
  )
}

export default Dashboard