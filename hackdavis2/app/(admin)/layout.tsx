import { getUser } from "@propelauth/nextjs/server/app-router";
import Link from "next/link";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (user) {
    return <div>{children}</div>;
  } else {
    return <Link href="/">not logged in, return to main page</Link>;
  }
}
