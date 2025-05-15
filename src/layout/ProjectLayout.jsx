import { Outlet } from "react-router-dom";
import PeopleSubNavbar from "../Components/PeopleSubNavbar";
import Navbar from "../Components/navbar";
import ProjectSubNavbar from "../Components/ProjectSubNavbar";

const ProjectLayout = () => {
  console.log("home")
  return (
    <div>
        <Navbar />
      <ProjectSubNavbar />
      <div className="pt-[8.5rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectLayout;
