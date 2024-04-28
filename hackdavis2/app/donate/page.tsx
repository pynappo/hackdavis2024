import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
const prisma = new PrismaClient();

export default async function Donate() {
  let items = await prisma.item.findMany({
    include: {
      category: true,
    },
  });
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {items.map((item) => (
        <div
          className="flex flex-col justify-center w-96 min-h-96 bg-red-50 items-center rounded-2xl gap-3 p-4"
          key={item.id}
        >
          <Image src={item.imageSrc} alt={item.name} width={200} height={200} />
          <h1>{item.name}</h1>
          <div
            className="rounded-full h-8 w-5/6 bg-yellow-950 flex justify-center items-center text-green-500 font-bold"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(200, 224, 255, 1) ${item.quantity * 5}%, rgba(50, 70, 70, 1) ${item.quantity * 5 + 10}%)`,
            }}
          >
            {item.quantity}
          </div>
          <div className="flex flex-row rounded-lg text-black font-bold p-4 py-2 items-center text-left bg-emerald-400">
            Donate from:
            <span className="mx-2 flex flex-row items-center justify-center content-center gap-2">
              <Link
                href={`https://www.amazon.com/s?k=${encodeURIComponent(item.name)}`}
                className="text-black bg-yellow-300 rounded-full p-2 py-1"
              >
                Amazon
              </Link>
              <Link
                href={`https://www.amazon.com/s?searchTerm=${encodeURIComponent(item.name)}`}
                className="text-red-500 bg-white rounded-full p-2 py-1"
              >
                Target
              </Link>
              <Link
                href={`https://www.walmart.com/search?q=${encodeURIComponent(item.name)}`}
                className="text-white bg-blue-500 rounded-full p-2 py-1"
              >
                Walmart
              </Link>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
