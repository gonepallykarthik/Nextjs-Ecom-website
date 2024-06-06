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
import { DeleteUserAction } from "./_components/UserActions";

function UserPage() {
  return (
    <>
      <Flex mb={10} minWidth="max-content" alignItems="center" gap="2">
        <PageHeader>Customers</PageHeader>
        <Spacer />
      </Flex>

      <UserTable />
    </>
  );
}

export default UserPage;

async function UserTable() {
  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { price: true } },
      _count: { select: { orders: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  if (users.length === 0) return <p>No users! 🥹</p>;

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Email</Th>
          <Th>Orders</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.email}</Td>
            <Td>{NUM_FORM(user.orders.length)}</Td>
            <Td>
              {NUM_FORM(user.orders.reduce((sum, o) => o.price + sum, 0) / 100)}
            </Td>
            <ButtonGroup spacing={4}>
              <DeleteUserAction
                id={user.id}
                disabled={user._count.orders > 0}
              />
            </ButtonGroup>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
