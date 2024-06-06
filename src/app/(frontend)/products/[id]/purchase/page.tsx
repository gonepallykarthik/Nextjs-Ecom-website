import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/checkout";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type props = {
  params: { id: string };
};

export default async function purchaseProduct({ params: { id } }: props) {
  const product = await db.product.findUnique({ where: { id: id } });
  if (product == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price,
    currency: "INR",
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error("something went wrong please try again");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
