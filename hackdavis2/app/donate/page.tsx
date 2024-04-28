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
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <div
          className="flex flex-col w-96 h-96 bg-red-50 items-center rounded-2xl gap-3"
          key={item.id}
        >
          <Image src={item.image} alt={item.name} width={200} height={200} />
          <h1>{item.name}</h1>
          <div
            className="rounded-full h-8 w-5/6 bg-yellow-950 flex justify-center items-center text-green-500 font-bold"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(200, 224, 255, 1) ${item.quantity * 5}%, rgba(50, 70, 70, 1) ${item.quantity * 5 + 10}%)`,
            }}
          >
            {item.quantity}
          </div>
          <Link
            className="rounded-full bg-yellow-300 text-black font-bold p-4 py-2"
            href={`https://www.amazon.com/s?k=${encodeURI(item.name)}`}
          >
            Donate from Amazon
          </Link>
        </div>
      ))}
    </div>
  );
}
