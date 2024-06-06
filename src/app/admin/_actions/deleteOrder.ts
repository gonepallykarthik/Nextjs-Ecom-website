"use server";

import db from "@/db/db";
import { notFound } from "next/navigation";

export async function DeleteOrder(id: string) {
  const order = db.order.delete({
    where: { id: id },
  });

  if (order == null) return notFound();

  return order;
}
