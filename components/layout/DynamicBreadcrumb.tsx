"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // removes empty strings

  // Build breadcrumb items dynamically
  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    return (
      <BreadcrumbItem key={href}>
        {!isLast ? (
          <>
            <BreadcrumbLink
              asChild
              className="capitalize text-lg font-semibold hover:text-indigo-500 transition-colors"
            >
              <Link href={href}>{segment}</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </>
        ) : (
          <BreadcrumbPage className="capitalize text-xl font-bold">
            {segment}
          </BreadcrumbPage>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <div className="relative">
      <i className="w-full h-5 bg-indigo-500 blur-xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-200 ease-out"></i>
      <Breadcrumb className="py-5 px-5 bg-transparent relative z-10">
        <BreadcrumbList>{crumbs}</BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
