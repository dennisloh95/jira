import { Dashboard } from "types/dashboard";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import {
  useDashboardsQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteDashboard } from "utils/dashboard";
import { Row } from "components/lib";
import { forwardRef } from "react";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) return null;

  return <img alt="task icon" src={name === "task" ? taskIcon : bugIcon} />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();

  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const DashboardColumn = forwardRef<
  HTMLDivElement,
  { dashboard: Dashboard }
>(({ dashboard, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === dashboard.id);

  return (
    <Container ref={ref} {...props}>
      <Row between={true}>
        <h3>{dashboard.name}</h3>
        <More dashboard={dashboard} key={dashboard.id} />
      </Row>
      <TasksContainer>
        <Drop
          type={"row"}
          direction={"vertical"}
          droppableId={String(dashboard.id)}
        >
          <DropChild style={{ minHeight: "5px" }}>
            {tasks?.map((task, index) => (
              <Drag key={task.id} index={index} draggableId={"task" + task.id}>
                <div>
                  <TaskCard task={task} key={task.id} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask dashboardId={dashboard.id} />
      </TasksContainer>
    </Container>
  );
});

const More = ({ dashboard }: { dashboard: Dashboard }) => {
  const { mutateAsync } = useDeleteDashboard(useDashboardsQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "Confirm",
      cancelText: "Cancel",
      title: "Confirm delete dashboard?",
      onOk() {
        return mutateAsync({ id: dashboard.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startEdit}>
          Delete
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
