import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="flex justify-between items-center bg-black">
        <h2 className="font-bold p-5 text-white">
          Davis Community Meals and Housing
        </h2>
        <Link href="/login" className="mx-5">
          <h2 className="px-2.5 py-1 text-black bg-white hover:bg-[#52525b] hover:text-white">
            Admin Login
          </h2>
        </Link>
      </header>
    </main>
  );
}
