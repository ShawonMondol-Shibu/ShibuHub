"use client";
import { audio } from "@/lib/alert";
import { useRouter } from "next/navigation";
import * as React from "react";
import { createContext, ReactNode } from "react";
import { toast } from "sonner";

interface heartsType {
  id: number;
  image: string;
  title: string;
  price: number;
}
interface cartsType {
  id: number;
  image: string;
  title: string;
description:string;
  quantity: number;
  price: number;
}

// Define the context value type
export interface UserContextType {
  carts: cartsType[];
  hearts: heartsType[];
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setHearts: React.Dispatch<React.SetStateAction<heartsType[]>>;
  setCarts: React.Dispatch<React.SetStateAction<cartsType[]>>;
  handleCart: (id: number, image: string, title: string,description:string, price: number) => void;
  handleQuantity: (id: number, quantity: number) => void;
  handleRemoveCart: (id: number) => void;
  handleHeart: (
    id: number,
    image: string,
    title: string,
    price: number
  ) => void;
  handleRemoveHeart: (id: number) => void;
}

const defaultUserContext: UserContextType = {
  carts: [],
  hearts: [],
  totalPrice: 0,
  setTotalPrice: () => {},
  setCarts: () => {},
  setHearts: () => {},
  handleCart: () => {},
  handleHeart: () => {},
  handleQuantity: () => {},
  handleRemoveCart: () => {},
  handleRemoveHeart: () => {},
};

// Create context with a default value

export const userContext = createContext<UserContextType>(defaultUserContext);

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const router = useRouter()
  const [hearts, setHearts] = React.useState<heartsType[]>([]);
  const [carts, setCarts] = React.useState<cartsType[]>([]);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  React.useEffect(() => {
    const storedCarts = localStorage.getItem("carts");
    const storedHearts = localStorage.getItem("hearts");
    if (storedCarts) setCarts(JSON.parse(storedCarts));
    if (storedHearts) setHearts(JSON.parse(storedHearts));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
    localStorage.setItem('hearts', JSON.stringify(hearts))
  }, [carts,hearts]);

  // Add to Cart Context
  const handleCart = (
    id: number,
    image: string,
    title: string,
    description:string,
    price: number
  ) => {
    const existCart = carts.find((cart: { id: number }) => cart.id === id);
    if (existCart) {
      toast.error("Already added to cart");
      audio.play()
      return;
    } else {
      setCarts([...carts, { id, image, title, description, quantity: 1, price }]);
      toast.success("Added to cart");
      router.push('/checkout')
      audio.play()
    }
  };
  
  const handleQuantity = (id: number, quantity: number) => {
    
    setCarts(
      carts.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    if (quantity === 0) {
      setCarts(carts.filter((item) => item.id !== id));
      toast.warning("Removed from cart");
      audio.play()
    }
  };
  
  const handleRemoveCart = (id: number) => {
    setCarts(carts.filter((item) => item.id !== id));
    toast.warning("Removed from cart");
    audio.play()
  };
  
  
  //Add to Heart Or Favourite Context
  const handleHeart = (
    id: number,
    image: string,
    title: string,
    price: number
  ) => {
    const existHeart = hearts.find((heart: { id: number }) => heart.id === id);
    if (existHeart) {
      toast.error("Already added to favourite");
      audio.play()
      return;
    } else {
      setHearts([...hearts, { id, image, title, price }]);
      toast.success("Added to favourite");
      audio.play()
    }
  };
  
  const handleRemoveHeart = (id: number) => {
    setHearts(hearts.filter((heart: { id: number }) => heart.id !== id));
    toast.warning("Removed from favourite");
    audio.play()
  };


  React.useEffect(() => {
    const price = carts.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(price.toFixed(2) as unknown as number );
  }, [carts]);

  console.log(carts, ...carts);
  console.log(hearts);
  return (
    <userContext.Provider
      value={{
        carts,
        hearts,
        totalPrice,
        setCarts,
        setHearts,
        setTotalPrice,
        handleCart,
        handleHeart,
        handleQuantity,
        handleRemoveCart,
        handleRemoveHeart,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
