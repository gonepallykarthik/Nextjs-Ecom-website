import {
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import db from "@/db/db";
import { CURRENCY_FORM, NUM_FORM } from "@/app/formaters/format";
import { DeleteOrderAction } from "./_components/OrderAction";

function OrdersPage() {
  return (
    <>
      <Flex mb={10} minWidth="max-content" alignItems="center" gap="2">
        <PageHeader>Orders Page</PageHeader>
        <Spacer />
      </Flex>

      <UserTable />
    </>
  );
}

export default OrdersPage;

async function UserTable() {
  const orders = await db.order.findMany({
    select: {
      id: true,
      price: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  if (orders.length === 0) return <p>No orders! 🥹</p>;

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Product</Th>
          <Th>Customer</Th>
          <Th>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order.id}>
            <Td>{order.product.name}</Td>
            <Td>{order.user.email}</Td>
            <Td>{CURRENCY_FORM(order.price / 100)}</Td>
            <ButtonGroup spacing={4}>
              <DeleteOrderAction id={order.id} />
            </ButtonGroup>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
