import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { DashboardScreen } from "screens/dashboard";
import { ProjectTeamScreen } from "screens/project-team";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"dashboard"}>Dashboard</Link>
      <Link to={"project-team"}>Project Team</Link>
      <Routes>
        <Route path={"/dashboard"} element={<DashboardScreen />} />
        <Route path={"/project-team"} element={<ProjectTeamScreen />} />
        <Navigate to={window.location.pathname + "/dashboard"} />
      </Routes>
    </div>
  );
};
