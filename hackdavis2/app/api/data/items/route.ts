import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  let res = await prisma.item.findMany({
    include: {
      category: true,
    },
  });
  return Response.json(res);
}

export async function PUT(request: Request) {
  const item = await request.json();
  delete item.category;
  const updateItem = await prisma.item.update({
    where: {
      id: item.id,
    },
    data: item,
  });
  return Response.json(updateItem);
}

export async function POST(request: Request) {
  const items = await request.json();
  const res = await prisma.item.createMany({
    data: items,
  });
  return Response.json(res);
}

export async function DELETE(request: Request) {
  const items = await request.json();
  const res = await prisma.item.deleteMany({
    where: {
      id: {
        in: items.map((item) => item.id),
      },
    },
  });
  return Response.json(res);
}
