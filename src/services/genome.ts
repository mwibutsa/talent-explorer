import { IUserGenome } from "@/interfaces";
import apiCall from "@/utils/apiCall";

export const fetchGenome = async (
  username: string
): Promise<IUserGenome | null> => {
  try {
    const { data } = await apiCall.get(`/api/genome?username=${username}`);
    return data;
  } catch {
    return null;
  }
};
