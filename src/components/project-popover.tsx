import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
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
      <ButtonNoPadding
        onClick={() => props.setProjectModalOpen(true)}
        type={"link"}
      >
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
