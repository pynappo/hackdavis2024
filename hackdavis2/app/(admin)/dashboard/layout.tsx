import Link from "next/link";
export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <header className="text-xl flex flex-row h-8 items-center">
        <Link href="/dashboard">Admin Dashboard</Link>
      </header>
      {children}
    </main>
  );
}
