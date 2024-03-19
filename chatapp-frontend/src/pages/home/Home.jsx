import Containers from "../../components/Containers";
import Topbar from "../../components/topbar/Topbar";
import "./home.css"

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
          <Containers/>
      </div>
    </>
  );
}
