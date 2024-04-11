"use server";

import db from "@/app/db/db";
import { z } from "zod";

import fs from "fs/promises";
import { redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "required" });

const ProductSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().int().min(1),
  desc: z.string().min(6),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: fileSchema.refine((file) => file.size > 0, "Required"),
});

export async function AddProduct(prevState: unknown, formData: FormData) {
  const result = ProductSchema.safeParse({
    name: formData.get("product_name"),
    price: formData.get("product_price"),
    desc: formData.get("product_desc"),
    file: formData.get("product_file"),
    image: formData.get("product_img"),
  });

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  const filepath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filepath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      purchasable: false,
      name: data.name,
      description: data.desc,
      price: data.price,
      filePath: filepath,
      imagePath: imagePath,
    },
  });

  redirect("/admin/products");
}
