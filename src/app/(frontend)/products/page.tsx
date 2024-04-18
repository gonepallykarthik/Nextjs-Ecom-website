import db from "@/db/db";
import { Container, Flex, Grid, Text } from "@chakra-ui/react";
import { ProductGridSection } from "../page";
import ProductCard from "@/User_components/ProductCard";

async function getAllProducts() {
  return await db.product.findMany({
    where: { purchasable: true },
    orderBy: { name: "asc" },
  });
}

async function ProductPage() {
  const prods = await getAllProducts();
  return (
    <Flex justifyContent="center" alignItems="center" direction="column">
      <Text mb={10} as="b" fontSize="3xl">
        All Products
      </Text>
      <Grid mx={200} templateColumns="repeat(4,1fr)" gap={4}>
        {prods.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name}
            desc={product.description}
            price={product.price}
            img={product.imagePath}
          />
        ))}
      </Grid>
    </Flex>
  );
}

export default ProductPage;
