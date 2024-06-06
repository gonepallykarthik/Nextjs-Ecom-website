"use server";

import db from "@/db/db";

export default async function userOrderExists(
  email: string,
  productId: string
) {
  const order = await db.order.findFirst({
    where: { user: { email }, productId: productId },
    select: { id: true },
  });

  return order ? order != null : "";
}
