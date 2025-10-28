"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
interface userType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface defaultContextType {
  userData: userType[];
  setUser: React.Dispatch<React.SetStateAction<userType[]>>;
  handleSignup: (data: userType) => void;
}
const defaultContext: defaultContextType = {
  userData: [],
  setUser: () => {},
  handleSignup: () => {},
};
const userContext = createContext<defaultContextType>(defaultContext);

export default function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUser] = useState<userType[]>([]);
  const router = useRouter();

  const handleSignup = (data: userType) => {
    const isUserExist = userData.find((user) => user.email == data.email);
    if (isUserExist) {
      return toast.error("invalid credentials");
    } else {
      setUser([...userData, data]);
      console.log(userData);
      toast.success("You are successfully signed up.");
      router.push("/dashboard/signIn");
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("dashboard-data");
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-data", JSON.stringify(userData));
  }, [userData]);
  return (
    <userContext.Provider value={{ userData, setUser, handleSignup }}>
      {children}
    </userContext.Provider>
  );
}

export const DashboardContext = () => {
  return useContext(userContext);
};
