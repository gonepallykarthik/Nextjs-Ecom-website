"use server";

import db from "@/db/db";
import OrderHistoryEmail from "@/email/Orderhistory";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().email();
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function OrderHistory(
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const email = emailSchema.safeParse(formData.get("email"));

  if (email.success == false) {
    return { error: "Invalid email address" };
  }

  const user = await db.user.findUnique({
    where: { email: email.data },
    select: {
      email: true,
      id: true,
      orders: {
        select: {
          price: true,
          id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              imagePath: true,
            },
          },
        },
      },
    },
  });

  if (user == null) {
    return { error: "No user found with that email" };
  }

  const orders = user.orders.map(async (order) => {
    return {
      ...order,
      downloadVerificationId: (
        await db.downloadVerification.create({
          data: {
            expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
            productId: order.product.id,
          },
        })
      ).id,
    };
  });

  const data = await resend.emails.send({
    from: `Support <${process.env.SENDER}>`,
    to: user.email,
    subject: "Order History",
    react: <OrderHistoryEmail orders={await Promise.all(orders)} />,
  });

  if (data.error) {
    return { error: "Something went wrong Please try again!" };
  }

  return { message: "Please chek your email to view your order history" };
}
