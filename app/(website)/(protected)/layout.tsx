import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = (await cookies()).get("token")?.value;
  if (!cookie) {
    return redirect("/login");
  }

  return children;
}
