"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle } from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface formType {
  name: string;
  label: string;
  holder: string;
}

const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "please enter your first name" }),
    lastName: z.string().min(2, { message: "please enter your last name" }),
    email: z.email({ message: "please enter you email address" }),
    password: z.string().min(8, { message: "please enter a valid password" }),
    confirm: z.string(),
  })
  .superRefine(({ confirm, password }, ctx) => {
    if (confirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The password did not match",
        path: ["confirm"],
      });
    }
  });

export default function SignUp() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const formInputs = [
    { name: "firstName", label: "First Name", holder: "Enter first name" },
    { name: "lastName", label: "First Name", holder: "Enter last name" },
    { name: "email", label: "Email", holder: "Enter email address" },
    { name: "password", label: "Password", holder: "Enter you password" },
    { name: "confirm", label: "Confirm Password", holder: "Confirm Password" },
  ];

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast.success("You are successfully signed up.");
    router.push("/dashboard/signIn");
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Toaster richColors />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 w-lg p-5 border rounded-2xl shadow "
        >
          <CardTitle className="text-center">Sign Up in to ShibuHub</CardTitle>
          {formInputs.map((inputs: formType) => (
            <FormField
              key={inputs.name}
              control={form.control}
              name={inputs.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{inputs.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={inputs.holder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex items-center justify-between">
            <Button variant={"default"} type="submit">
              Submit
            </Button>
            <small>
              I already have an account
              <Button variant={`link`} asChild>
                <Link href={"/dashboard/signIn"}>sign in</Link>
              </Button>
            </small>
          </div>
        </form>
      </Form>
    </div>
  );
}
