import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const res = await prisma.item.findMany();

  return Response.json(res);
}

export async function PUT(request: Request) {
  const item = await request.json();
  console.log("request  " + request);
  console.log("item  " + item);
  const updateItem = await prisma.item.update({
    where: {
      id: item.id,
    },
    data: {
      ...item,
    },
  });
  return Response.json(item);
}

export async function POST(request: Request) {
  const items = await request.json();
  console.log(items);
  const res = await prisma.item.createMany({
    data: items,
  });
  return Response.json(res);
}
