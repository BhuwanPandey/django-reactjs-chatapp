import Containers from "../../components/containers/Containers";
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
