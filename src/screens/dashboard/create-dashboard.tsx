import { useState } from "react";
import { useAddDasbhoard } from "utils/dashboard";
import { useDashboardsQueryKey, useProjectIdInUrl } from "./util";
import { Input } from "antd";
import { Container } from "./dashboard-column";

export const CreateDashboard = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addDashboard } = useAddDasbhoard(
    useDashboardsQueryKey()
  );
  const submit = async () => {
    await addDashboard({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"New Dashboard Name"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
