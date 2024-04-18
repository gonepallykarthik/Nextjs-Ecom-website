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
import { CURRENCY_FORM } from "@/app/formaters/format";
import { DeleteItem } from "../_components/ProductActions";

function AdminProductPage() {
  return (
    <>
      <Flex mb={10} minWidth="max-content" alignItems="center" gap="2">
        <PageHeader>Products Page</PageHeader>
        <Spacer />

        <ButtonGroup size="sm" isAttached variant="outline">
          <Button bgColor="pink" color="black" fontSize="xl" px={3} py={6}>
            <Link href="/admin/products/new">Add Product</Link>
          </Button>
        </ButtonGroup>
      </Flex>

      <ProductsTable />
    </>
  );
}

export default AdminProductPage;

async function ProductsTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      purchasable: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) return <p>No Products</p>;

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Price</Th>
          <Th>Orders by</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr key={product.id}>
            <Td>{product.name}</Td>
            <Td>{CURRENCY_FORM(product.price)}</Td>
            <Td>{product._count.orders}</Td>
            <ButtonGroup spacing={4}>
              <Button bgColor="pink" color="black" fontSize="sm" as="b">
                <a href={`/admin/products/${product.id}/download`}>
                  {" "}
                  Download{" "}
                </a>
              </Button>
              <Button bgColor="pink" color="black" fontSize="sm" as="b">
                <a href={`/admin/products/${product.id}/edit`}> Edit </a>
              </Button>
              <DeleteItem
                id={product.id}
                disabled={product._count.orders > 0}
              />
            </ButtonGroup>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
