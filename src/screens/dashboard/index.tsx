import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useDashboards } from "utils/dashboard";
import { DashboardColumn } from "./dashboard-column";
import { useDashboardSearchparams, useProjectInUrl } from "./util";
import { SearchPanel } from "screens/dashboard/search-panel";
import { ScreenContainer } from "components/lib";

export const DashboardScreen = () => {
  useDocumentTitle("Dashboard List");

  const { data: currentProject } = useProjectInUrl();
  const { data: dashboards = [] } = useDashboards(useDashboardSearchparams());

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} Dashboard</h1>
      <SearchPanel />
      <ColumnsContainer>
        {dashboards.map((dashboard) => (
          <DashboardColumn key={dashboard.id} dashboard={dashboard} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
