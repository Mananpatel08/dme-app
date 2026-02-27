import { useGetUserQuery } from "@/api/auth";
import { User } from "@/types";
import { createContext, useContext, useMemo } from "react";

interface UserContextType {
  userDetails: User | null;
  profileRefetch: () => void;
  isProfileLoading: boolean;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const {
    data: userDetails = null,
    isLoading: isProfileLoading,
    refetch: profileRefetch,
  } = useGetUserQuery();

  const value = useMemo(
    () => ({
      userDetails,
      profileRefetch,
      isProfileLoading,
    }),
    [userDetails, profileRefetch, isProfileLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used inside UserProvider");
  }

  return context;
};
