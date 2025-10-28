"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface userType {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  address?: string;
}

interface authContextType {
  userData: userType[];
  setUserData: React.Dispatch<React.SetStateAction<userType[]>>;
  handleSignup: (data: userType) => void;
}

const defaultAuthContext: authContextType = {
  userData: [],
  setUserData: () => {},
  handleSignup: () => {},
 
};

const authContext = createContext<authContextType>(defaultAuthContext);
export const AuthContext = () => useContext(authContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<userType[]>([]);
  const router = useRouter()

  useEffect(() => {
    const storedUsers = localStorage.getItem("userData");
    if (storedUsers) {
      setUserData(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const handleSignup = (data: userType) => {
    const userExists = userData.find((user) => user.email === data.email);
    if (userExists) {
      toast.error("invalid credentials");
      return;
    }else{
      setTimeout(()=>{
        setUserData([...userData, data]);
        toast.success("You have signed up Successfully")
        router.push('/login') 
        
      },1000)
    }
  };

  return (
    <authContext.Provider value={{ userData, setUserData, handleSignup,}}>
      {children}
    </authContext.Provider>
  );
}
