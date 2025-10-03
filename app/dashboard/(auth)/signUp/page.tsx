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

  const handleSubmit = () => {
    toast.success("You are successfully signd up.");
    return (location.href = "/dashboard/signIn");
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
