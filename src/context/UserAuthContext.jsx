/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { account } from "../appwriteConfig";

export const UserAuthContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await account.get(); 
        setUser(response); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserAuthContext.Provider>
  );
};
