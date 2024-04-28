import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
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
