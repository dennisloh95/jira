import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects, isLoading } = useProjects();
  const pinnedProjeccts = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>Favourite Task</Typography.Text>
      <List>
        {pinnedProjeccts?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={"link"}>
        Add task
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>Tasks</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
