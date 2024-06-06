import ProductCard from "@/User_components/ProductCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Product } from "@prisma/client";
import Link from "next/link";

const getMostPopularItems = cache(
  () => {
    return db.product.findMany({
      where: { purchasable: true },
      orderBy: { orders: { _count: "desc" } },
    });
  },
  ["/", "getMostPopularItems"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestItems = cache(() => {
  return db.product.findMany({
    where: { purchasable: true },
    orderBy: { createdAt: "desc" },
  });
}, ["/", "getNewestItems"]);

function HomePage() {
  return (
    <main>
      <Container>
        <ProductGridSection
          title="Most Popular"
          productsFetcher={getMostPopularItems}
        />
        <Box my={10}></Box>
        <ProductGridSection title="Newest" productsFetcher={getNewestItems} />
      </Container>
    </main>
  );
}

export default HomePage;

type ProductProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

export const ProductGridSection = async ({
  title,
  productsFetcher,
}: ProductProps) => {
  return (
    <Container>
      <Flex gap={28} alignItems="center" mb={4}>
        <Text as="b" fontSize="3xl">
          {title}
        </Text>
        <Button bgColor="pink" py={4} px={6} color="black" fontSize="md">
          {" "}
          <Link href="/products">View All </Link>
        </Button>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {(await productsFetcher()).map((product) => (
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
    </Container>
  );
};
