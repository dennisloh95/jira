import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useDashboards, useReorderDashboard } from "utils/dashboard";
import { DashboardColumn } from "./dashboard-column";
import {
  useDashboardSearchparams,
  useDashboardsQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { SearchPanel } from "screens/dashboard/search-panel";
import { ScreenContainer } from "components/lib";
import { useReorderTask, useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateDashboard } from "./create-dashboard";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { useCallback } from "react";

export const DashboardScreen = () => {
  useDocumentTitle("Dashboard List");

  const { data: currentProject } = useProjectInUrl();
  const { data: dashboards, isLoading: dashboardIsLoading } = useDashboards(
    useDashboardSearchparams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || dashboardIsLoading;

  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name} Dashboard</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"column"}
              direction={"horizontal"}
              droppableId={"dashboard"}
            >
              <DropChild style={{ display: "flex" }}>
                {dashboards?.map((dashboard, index) => (
                  <Drag
                    key={dashboard.id}
                    draggableId={"dashboard" + dashboard.id}
                    index={index}
                  >
                    <DashboardColumn key={dashboard.id} dashboard={dashboard} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateDashboard />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: dashboards } = useDashboards(useDashboardSearchparams());
  const { mutate: reorderDashboard } = useReorderDashboard(
    useDashboardsQueryKey()
  );
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      if (type === "column") {
        const fromId = dashboards?.[source.index].id;
        const toId = dashboards?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderDashboard({ fromId, referenceId: toId, type });
      }
      if (type === "row") {
        const fromDashboardId = +source.droppableId;
        const toDashboardId = +destination.droppableId;

        const fromTask = allTasks?.filter(
          (task) => task.kanbanId === fromDashboardId
        )[source.index];
        const toTask = allTasks?.filter(
          (task) => task.kanbanId === toDashboardId
        )[destination.index];

        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId: fromDashboardId,
          toKanbanId: toDashboardId,
          type:
            fromDashboardId === toDashboardId &&
            destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [dashboards, reorderDashboard, allTasks, reorderTask]
  );
};

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
