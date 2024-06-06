"use client";

import { OrderHistory } from "@/actions/Orders";
import {
  Text,
  Container,
  InputGroup,
  Input,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";

export default function OrdersPage() {
  const [data, action] = useFormState(OrderHistory, {});
  return (
    <Container>
      <h1 className="font-bold text-2xl text-gray-900 mb-2">My Orders</h1>
      <h1 className="mb-10 text-md text-gray-800">
        Enter your Email and we will send your Order History to your Email
      </h1>

      <form action={action}>
        <div className="w-5/6 h-12 p-4">
          <InputGroup>
            <InputLeftAddon>Email : </InputLeftAddon>
            <Input
              textAlign="center"
              variant="flushed"
              required
              placeholder="Enter Email"
              name="email"
              id="email"
            />
          </InputGroup>
          {data.error && <div className="text-destructive"> {data.error}</div>}
        </div>
        <div className="mt-10 ">
          {data.message ? (
            <p className="text-slate-900 text-xl ">{data.message}</p>
          ) : (
            <SubmitButton />
          )}
        </div>
      </form>
    </Container>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md py-2 px-6 w-full mx-auto text-center mt-8 bg-slate-900 text-white hover:bg-slate-600"
    >
      {pending ? "Please wait..." : "Submit"}
    </button>
  );
}
