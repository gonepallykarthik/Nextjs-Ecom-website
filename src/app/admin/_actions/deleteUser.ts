"use server";

import db from "@/db/db";
import { notFound } from "next/navigation";

export async function DeleteUser(id: string) {
  const user = db.user.delete({
    where: { id: id },
  });

  if (user == null) return notFound();

  return user;
}
