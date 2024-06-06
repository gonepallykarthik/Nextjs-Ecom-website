import { CURRENCY_FORM } from "@/app/formaters/format";
import db from "@/db/db";
import { Button, Flex, Text } from "@chakra-ui/react";
import { PaymentElement } from "@stripe/react-stripe-js";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function successPage({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  const payment_intent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (payment_intent.metadata.productId == null) return notFound();

  const product = await db.product.findUnique({
    where: { id: payment_intent.metadata.productId },
  });

  if (product == null) return notFound();

  const isSuccess = payment_intent.status === "succeeded";

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <Text as="b" fontSize="large">
        {isSuccess ? "Success 🚀" : "failed!"}
      </Text>
      <Flex gap={4} alignItems="center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image fill src={product.imagePath} alt={""} />
        </div>
        <div>
          <Text fontSize="2xl" as="b">
            {CURRENCY_FORM(product.price)}
          </Text>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </Flex>
      <Button variant="outline" size="lg" colorScheme="pink">
        {isSuccess ? (
          <a
            href={`/products/download/${await createDownloadVerification(
              product.id
            )}`}
          >
            Download
          </a>
        ) : (
          <Link href={`/products/${product.id}/purchase`}>Try again</Link>
        )}
      </Button>
    </div>
  );
}

async function createDownloadVerification(productId: string) {
  const downloadid: string = (
    await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id;
  // console.log(downloadid);
  return downloadid;
}
