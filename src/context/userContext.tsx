"use client";
import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { IUser } from "@/interfaces";

const UserContext = createContext<{
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}>({
  users: [],
  setUsers: () => {},
});

export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (!useContext) {
    throw new Error(
      "Component needs to be wrapped inside user context provider"
    );
  }

  return userContext;
};

const UserContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);

  const value = useMemo(
    () => ({
      users,
      setUsers,
    }),
    [users]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
