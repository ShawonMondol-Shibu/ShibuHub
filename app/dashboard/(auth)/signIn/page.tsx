"use client";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(100, { message: "Password must be less than 100 characters." }),
});

export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Submitted data:", data);
    toast.success("You are logged in successfully.");
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form {...form}>
        <Toaster richColors />
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="min-w-md border p-4 rounded-2xl space-y-8"
        >
          <CardTitle className="text-center">Sign In to ShibuHub</CardTitle>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    placeholder="name@example.com"
                    {...field}
                  />
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
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <span className="text-center ">
            <small>I dont have an account</small>
            <Button variant={`link`} size={"sm"} asChild>
              <Link href="/dashboard/signUp">sign up</Link>
            </Button>
          </span>
        </form>
      </Form>
    </div>
  );
}
