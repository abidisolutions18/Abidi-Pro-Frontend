import { Outlet } from "react-router-dom";
import PeopleSubNavbar from "../Components/PeopleSubNavbar";
import Navbar from "../Components/navbar";

const PeopleLayout = () => {
  console.log("home")
  return (
    <div>
        <Navbar />
      <PeopleSubNavbar />
      <div className="pt-[8.5rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default PeopleLayout;
