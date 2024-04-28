"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

export async function createItems(counter: number, formData: FormData) {
  const rawItems = [];
  for (let i = 0; i <= counter; i++) {
    rawItems.push({
      name: (formData.get(`item${i}`) as string) ?? "failed",
      quantity: Number(formData.get(`quantity${i}`)),
      categoryId: Number(formData.get(`category${i}`)),
    });
  }

  console.log(rawItems);
  // mutate data
  const res = await prisma.item.createMany({
    data: rawItems,
  });
  // revalidate cache
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
