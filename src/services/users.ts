import apiCall from "@/utils/apiCall";

export const fetchUsers = async (query: string) => {
  const { data } = await apiCall.post("/api/users", {
    query,
  });
  return data;
};
