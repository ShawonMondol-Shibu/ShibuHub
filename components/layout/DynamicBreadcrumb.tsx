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
              className="capitalize text-lg font-semibold hover:text-primary transition-colors"
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
    <Breadcrumb className="py-5 px-5">
      <BreadcrumbList>{crumbs}</BreadcrumbList>
    </Breadcrumb>
  );
}
