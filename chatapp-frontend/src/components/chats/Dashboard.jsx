import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./style.css";
import Topbar from "../../components/topbar/Topbar";
import { useParams } from "react-router-dom";

function Dashboard() {
  let { id } = useParams();
  return (
    <>
      <Topbar />
      <div className="chatHome">
        <div className="chatContainer">
          <Sidebar user_id={id} />
          <Chat />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
