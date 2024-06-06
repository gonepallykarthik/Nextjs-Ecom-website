"use client";

import userOrderExists from "@/app/actions/orders";
import { CURRENCY_FORM } from "@/app/formaters/format";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Product } from "@prisma/client";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { color } from "framer-motion";
import Image from "next/image";
import { FormEvent, useState } from "react";

type props = {
  product: Product;
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutForm({ product, clientSecret }: props) {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
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

      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form price={product.price} productId={product.id} />
      </Elements>
    </div>
  );
}

function Form({ price, productId }: { price: number; productId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [ErrMsg, setErrorMsg] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) {
      return;
    }

    setLoading(true);

    // dont purchase again if it is already purchased
    const orderExists = await userOrderExists(email, productId);

    if (orderExists) {
      setErrorMsg(
        "you have purchased it previously download it from my orders page!"
      );
      setLoading(false);
      return;
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMsg(error.message as string);
        } else {
          setErrorMsg("unknown error occured");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <Heading size="md"> Checkout</Heading>
          <Text fontSize="md" color="red">
            {ErrMsg}
          </Text>
        </CardHeader>
        <CardBody>
          <PaymentElement />
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
        </CardBody>
        <CardFooter>
          <Button
            disabled={stripe == null || elements == null || loading}
            className="w-full"
            bg="black"
            color="white"
            type="submit"
            isLoading={loading}
            loadingText="Please wait till we process your Transaction"
          >
            {loading
              ? "Please wait till we process your Transaction"
              : `Purchase ${CURRENCY_FORM(price)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
