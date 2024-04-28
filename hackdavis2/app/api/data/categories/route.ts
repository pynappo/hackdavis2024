import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(request: Request) {
  let res = await prisma.category.findMany();
  return Response.json(res);
}
