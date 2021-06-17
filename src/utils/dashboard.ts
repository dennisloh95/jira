import { QueryKey, useMutation, useQuery } from "react-query";
import { Dashboard } from "types/dashboard";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-options";

export const useDashboards = (param?: Partial<Dashboard>) => {
  const client = useHttp();
  return useQuery<Dashboard[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

export const useAddDasbhoard = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Dashboard>) =>
      client("kanbans", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteDashboard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  // item want to reorder
  fromId: number;
  // target item
  referenceId: number;
  // reoder to target item before or after
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderDashboard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: SortProps) =>
      client("kanbans/reorder", {
        data: params,
        method: "POST",
      }),
    useReorderKanbanConfig(queryKey)
  );
};
