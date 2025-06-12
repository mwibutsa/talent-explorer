import { IUser } from "@/interfaces";
import apiCall from "@/utils/apiCall";
import { processStream } from "@/utils/stream";

export const fetchUsers = async (query: string): Promise<IUser[]> => {
  try {
    const { data: text } = await apiCall.post(
      "/api/users",
      {
        query,
        limit: 20,
      },
      {
        responseType: "text",
      }
    );

    return processStream<IUser>(text);
  } catch (error) {
    console.error("Failed to fetch initial talents:", error);
    return [];
  }
};
