"use server";

import db from "@/db/db";
import { z } from "zod";

import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

const editSchema = ProductSchema.extend({
  file: fileSchema.optional(),
  image: fileSchema.optional(),
});

export async function EditProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse({
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
  const product = await db.product.findUnique({ where: { id: id } });
  if (product == null) return notFound();

  let filepath = product.filePath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath);
    filepath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filepath, Buffer.from(await data.file.arrayBuffer()));
  }

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id: id },
    data: {
      purchasable: false,
      name: data.name,
      description: data.desc,
      price: data.price,
      filePath: filepath,
      imagePath: imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const product = db.product.delete({ where: { id: id } });
  if (product == null) return notFound();

  await fs.unlink((await product).filePath);
  await fs.unlink(`public${(await product).imagePath}`);

  revalidatePath("/");
  revalidatePath("/products");
}
