"use client";
import { AuthContext } from "@/components/context/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
const formSchema = z.object({
  email: z.email({ message: "please enter your email" }).min(2),
  password: z.string().min(6, { message: "please enter password" }),
});
export default function Page() {
  const {userData} = AuthContext();
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <main className="min-h-screen flex items-center justify-center p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => {
          const exsitEmail = userData.find((user)=>user.email ==data.email)
          const exsitPass = userData.find((user)=>user.password ==data.password)
          if (exsitEmail && exsitPass) {
            alert('you logedin successfully')
router.push('/')
          }else{
            alert('invalid creadentials')
            
          }
        })}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">login</Button>
        </form>
      </Form>
    </main>
  );
}
