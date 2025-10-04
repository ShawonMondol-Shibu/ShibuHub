"use client";
import * as React from "react";
import { createContext, ReactNode } from "react";

// Define the context value type
export interface UserContextType {
  carts: number;
  hearts: number;
  setHearts: (value: number) => void;
  setCarts: (value: number) => void;
}

const defaultUserContext: UserContextType = {
  carts: 0,
  hearts: 0,
  setCarts: () => {},
  setHearts: () => {},
};
// Create context with a default value

export const userContext = createContext<UserContextType>(defaultUserContext);

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const [hearts, setHearts] = React.useState(0);
  const [carts, setCarts] = React.useState(0);

  return (
    <userContext.Provider value={{ carts, hearts, setHearts, setCarts }}>
      {children}
    </userContext.Provider>
  );
}
