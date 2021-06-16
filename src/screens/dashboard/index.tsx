import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useDashboards } from "utils/dashboard";
import { DashboardColumn } from "./dashboard-column";
import {
  useDashboardSearchparams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { SearchPanel } from "screens/dashboard/search-panel";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateDashboard } from "./create-dashboard";
import { TaskModal } from "./task-modal";

export const DashboardScreen = () => {
  useDocumentTitle("Dashboard List");

  const { data: currentProject } = useProjectInUrl();
  const { data: dashboards, isLoading: dashboardIsLoading } = useDashboards(
    useDashboardSearchparams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || dashboardIsLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} Dashboard</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {dashboards?.map((dashboard) => (
            <DashboardColumn key={dashboard.id} dashboard={dashboard} />
          ))}
          <CreateDashboard />
        </ColumnsContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
