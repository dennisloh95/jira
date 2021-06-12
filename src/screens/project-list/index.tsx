import { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Row, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectSearchParam } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("Task List", false);
  // const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useProjectSearchParam();

  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  const { open } = useProjectModal();

  return (
    <Container>
      <Row justify={"space-between"}>
        <h1>Tasks List</h1>
        <Button onClick={open}>Add Task</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={open}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
