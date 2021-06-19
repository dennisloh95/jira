import { useProjectIdInUrl } from "screens/dashboard/util";

export const useEpicSearchparams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useEpicsQueryKey = () => ["epics", useEpicSearchparams()];
