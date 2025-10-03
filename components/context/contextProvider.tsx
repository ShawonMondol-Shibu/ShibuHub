"use client";
import * as React from "react";
import { createContext, ReactNode } from "react";

// Define the context value type
interface UserContextType {
  carts: number;
  hearts: number;
  setHearts: React.Dispatch<React.SetStateAction<number>>;
  setCarts: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with a default value
export const userContext = createContext<UserContextType | null>(null);

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
