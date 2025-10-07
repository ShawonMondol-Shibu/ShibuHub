"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "please enter product name" }),
  description: z.string().min(2, { message: "please add product description" }),
  brand: z.string().min(2, { message: "please enter brand name" }),
  model: z.string().min(2, { message: "please enter model name" }),
  category: z.string().min(2, { message: "please enter category type" }),
  price: z.number({ message: "please enter the price" }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      model: "",
      category: "",
      price: 0,
    },
  });

  const handleSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-lg space-y-8 p-4 border rounded-2xl shadow"
        >
          <FormField
            control={form.control}
            name={`name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter product name`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`model`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Model</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter product model`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`category`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter product Category`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`brand`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Brand</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter product brand`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter product price`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Enter product description`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Add Product</Button>
        </form>
      </Form>
    </div>
  );
}
