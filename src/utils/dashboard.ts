import { useQuery } from "react-query";
import { Dashboard } from "types/dashboard";
import { useHttp } from "./http";

export const useDashboards = (param?: Partial<Dashboard>) => {
  const client = useHttp();
  return useQuery<Dashboard[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
