"use client";
import * as React from "react";
import { useState } from "react";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

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

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Please sign in.");
      router.push("/dashboard/signIn");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 w-lg p-5 border rounded-2xl shadow "
        >
          <CardTitle className="text-center">Sign Up to ShibuHub</CardTitle>

          <FormField
            control={form.control}
            name={"firstName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter first name`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"lastName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter last name`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter email address`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter you password`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"confirm"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder={`Confirm password`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Button variant={"default"} type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Submit"}
            </Button>
            <small>
              I already have an account
              <Button variant={`link`} size={"sm"} asChild>
                <Link href={"/dashboard/signIn"}>sign in</Link>
              </Button>
            </small>
          </div>
        </form>
      </Form>
    </div>
  );
}
