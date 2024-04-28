import Link from "next/link";
export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="text-xl flex flex-row h-8 items-center p-5 text-bold bg-green-900 text-white">
        <Link href="/dashboard">Admin Dashboard</Link>
      </header>
      {children}
    </div>
  );
}
