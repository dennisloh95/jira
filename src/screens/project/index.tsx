import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { DashboardScreen } from "screens/dashboard";
import styled from "@emotion/styled";
import { Menu } from "antd";
import { EpicScreen } from "screens/epic";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>Task Group</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<DashboardScreen />} />
          <Route path={"/epic"} element={<EpicScreen />} />
          <Navigate to={window.location.pathname + "/kanban"} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgba(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 -5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
