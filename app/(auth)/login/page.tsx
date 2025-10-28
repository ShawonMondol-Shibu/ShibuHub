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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email({ message: "please enter your email" }).min(2),
  password: z.string().min(6, { message: "please enter password" }),
});
export default function Page() {
  const [, setCookie] = useCookies(["token"]);
  const { userData } = AuthContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: z.infer<typeof formSchema>) => {
    const exsitUser = userData.find(
      (user) => user.email == data.email && user.password == data.password
    );

    if (exsitUser) {
      setCookie("token", "shibu");
      toast.success("you logedin successfully");
      router.push("/products");
    } else {
      toast.error("invalid creadentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => handleLogin(data))}
          className="space-y-5 border p-5 w-md rounded-md"
        >
          <legend className="text-2xl font-semibold text-center mb-5">
            Login to ShibuHub
          </legend>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <FormControl>
                    <InputGroupInput
                      type="email"
                      placeholder="Enter Email"
                      {...field}
                    />
                  </FormControl>
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
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
                <InputGroup>
                  <FormControl>
                    <InputGroupInput
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <InputGroupAddon>
                    <LockKeyhole />
                  </InputGroupAddon>
                </InputGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            login
          </Button>
          <span className="text-center ">
            <small>I dont have an account</small>
            <Button variant={`link`} size={"sm"} asChild>
              <Link href="/signup">sign up</Link>
            </Button>
          </span>
        </form>
      </Form>
    </main>
  );
}
