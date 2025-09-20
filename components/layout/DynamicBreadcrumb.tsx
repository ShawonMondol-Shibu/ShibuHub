"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function DynamicBreadcrumb() {
  const path = usePathname();
  const pageName = path.split("").splice(1, path.length).join("");

  console.log(pageName);
  return (
    <div className="relative m-auto">
      <i className="w-full h-5 bg-indigo-500 blur-xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-colors duration-200 ease-out"></i>

      <Breadcrumb className="py-10 px-5 bg-transparent z-10 ">
        <BreadcrumbList className="">
          <BreadcrumbItem>
            <BreadcrumbLink  className="text-lg font-semibold" asChild>
            <Link href="/">
              Home
            </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-semibold">
              {pageName.toUpperCase()}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
