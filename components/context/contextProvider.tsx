"use client";
import * as React from "react";
import { createContext, ReactNode } from "react";

// Define the context value type
export interface UserContextType {
  carts: {
    id: number;
    image: string;
    title: string;
    quantity: number;
    price: number;
  }[];
  hearts: number[];
  setHearts: (value: number[]) => void;
  setCarts: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        image: string;
        title: string;
        quantity: number;
        price: number;
      }[]
    >
  >;
  handleCart: (id: number, image: string, title: string, price: number) => void;
  handleQuantity: (id: number, quantity: number) => void;
  handleRemove: (id: number) => void;
  handleHeart: (id: number) => void;
}

const defaultUserContext: UserContextType = {
  carts: [],
  hearts: [],
  setHearts: () => {},
  setCarts: () => {},
  handleCart: () => {},
  handleHeart: () => {},
  handleQuantity: () => {},
  handleRemove: () => {},
};
// Create context with a default value

export const userContext = createContext<UserContextType>(defaultUserContext);

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const [hearts, setHearts] = React.useState<number[]>([]);
  const [carts, setCarts] = React.useState<
    {
      id: number;
      image: string;
      title: string;
      quantity: number;
      price: number;
    }[]
  >([]);

  const handleCart = (
    id: number,
    image: string,
    title: string,
    price: number,
  ) => {
    setCarts([...carts, { id, image, title, quantity: 1, price }]);
  };

  const handleHeart = (id: number) => {
    setHearts([...hearts, id]);
  };

  const handleQuantity = (id: number, quantity: number) => {
    setCarts(
      carts.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
    if (quantity === 0) {
      setCarts(carts.filter((item) => item.id !== id));
    }
  };

  const handleRemove = (id: number) => {
    setCarts(carts.filter((item) => item.id !== id));
  };

  console.log(carts, ...carts);
  return (
    <userContext.Provider
      value={{
        carts,
        hearts,
        setHearts,
        setCarts,
        handleCart,
        handleHeart,
        handleQuantity,
        handleRemove,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
