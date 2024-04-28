"use client";
import {
  useLogoutFunction,
  useRedirectFunctions,
} from "@propelauth/nextjs/client";
import Link from "next/link";
export default function Dashboard({ children }: { children: React.ReactNode }) {
  const logoutFn = useLogoutFunction();
  return (
    <div>
      <header className="text-xl flex flex-row h-8 items-center p-5 text-bold bg-green-900 text-white justify-between">
        <Link href="/dashboard">Admin Dashboard</Link>
        <button type="button" onClick={logoutFn} className="text-red-300">
          Log Out
        </button>
      </header>
      {children}
    </div>
  );
}
