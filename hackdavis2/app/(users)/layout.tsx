"use client";
import { AuthProvider } from "@propelauth/nextjs/client";
import Link from "next/link";
import Image from "next/image";
import {
  useUser,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/nextjs/client";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { redirectToSignupPage, redirectToLoginPage, redirectToAccountPage } =
    useRedirectFunctions();
  const { loading, user } = useUser();
  if (loading) return <div>Loading...</div>;
  let login = null;
  if (user) {
    login = (
      <Link href="/dashboard">
        <button className="flex items-center m-5 p-5 h-4 bg-black hover:scale-105">
          <p className="text-white hover:text-blue-300">DASHBOARD</p>
        </button>
      </Link>
    );
  } else {
    login = (
      <div onClick={() => redirectToLoginPage()}>
        <button className="flex items-center m-5 p-5 h-4 bg-black hover:scale-105">
          <p className="text-white hover:text-blue-300">LOGIN</p>
        </button>
      </div>
    );
  }
  return (
    <div>
      <header className="flex justify-between items-center bg-black">
        <Link
          href="/"
          className="flex flex-row font-bold p-5 text-white text-xl items-center gap-2 hover:text-blue-300"
        >
          <Image src="/logo.jpg" alt="DCMH Logo" width="40" height="40"></Image>
          DCMH
        </Link>
        <div className="flex flex-row items-center text-xl">
          <Link href="/donate" className="text-white hover:text-blue-300">
            Donate
          </Link>
          {login}
        </div>
      </header>
      {children}
    </div>
  );
}
