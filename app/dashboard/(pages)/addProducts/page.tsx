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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import Image from "next/image";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: "please enter product name" }),
  description: z.string().min(2, { message: "please add product description" }),
  brand: z.string().min(2, { message: "please enter brand name" }),
  model: z.string().min(2, { message: "please enter model name" }),
  category: z.string().min(2, { message: "please enter category type" }),
  price: z.number({ message: "please enter the price" }).positive(),
  comparePrice: z.number().optional(),
  stock: z.number().optional(),
  image: z.string().optional(),
});

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      model: "",
      category: "",
      price: 0,
      comparePrice: 0,
      stock: 0,
    },
  });

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const url = file ? URL.createObjectURL(file) : null;
    setImage(url);
    form.setValue("image", "https://plus.unsplash.com/premium_vector-1721569648469-97f6c6017148?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  };

  const handleSubmit = async (value: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (res.ok) {
        toast.success("Product added!");
        router.push("/dashboard/products");
      } else {
        toast.error("Failed to add product");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          <Card className={''}>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>

              <CardAction>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Product"}
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-wrap items-start justify-center gap-10 p-4">
              {/* Image upload section is added here. */}
              <div className=" w-md p-4 border rounded-lg space-y-10">
                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 font-medium text-gray-700 w-full h-96"
                  >
                    {image ? (
                      <Image
                        src={image as string}
                        alt="Product Image"
                        width={300}
                        height={300}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                        <ImagePlus size={50} />
                        Upload Product Image
                      </div>
                    )}
                  </label>
                </div>
                <Input
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={handleUploadImage}
                  className="hidden"
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product Category"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" w-md flex-col space-y-10 ">
                {/* Product Title, Description, Brand and Model fields are added here. */}
                <div className="space-y-10 border p-4 rounded-lg">
                  <div className="flex flex-col gap-6">
                    <CardTitle className="text-lg font-semibold">
                      General Information
                    </CardTitle>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Product Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Description</FormLabel>
                          <FormControl>
                            <Textarea
                              className="flex-2"
                              placeholder="Enter product description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Brand and Model fields are added here. */}
                  <div className="flex flex-wrap gap-10">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Product Brand</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product brand"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Product Model</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product model"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Product Price, Compare Price and Stock fields are added here. */}
                <div className={"space-y-6 border p-4 rounded-lg"}>
                  <CardTitle className="text-lg font-semibold">
                    Pricing And Stock
                  </CardTitle>

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="$ 500"
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="comparePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Compare Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="$ 450"
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter stock quantity"
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
