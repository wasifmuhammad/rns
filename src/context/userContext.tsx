import React, { createContext, useContext } from "react";

export interface Provider {
  userHistory: any;
  setUserHistory: (value: any) => void;
}
export const userContext = React.createContext<Provider>({
  userHistory: [],
  setUserHistory: (value) => {},
});

export const useUserContext = () => useContext(userContext);
