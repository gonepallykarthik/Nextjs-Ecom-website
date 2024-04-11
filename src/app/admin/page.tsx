import { Button, SimpleGrid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import db from "../db/db";
import { CURRENCY_FORM, NUM_FORM } from "../formaters/format";

const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: { price: true },
    _count: true,
  });

  return {
    total_amount: (data._sum.price || 0) / 100,
    total_sales: data._count,
  };
};

const getCustomerData = async () => {
  const userCount = await db.user.count();
  const orderData = await db.order.aggregate({
    _sum: { price: true },
  });

  return {
    userCount,
    AvgValue:
      userCount === 0 ? 0 : (orderData._sum.price || 0) / userCount / 100,
  };
};

const getProductData = async () => {
  const activeProd = await db.product.count({ where: { purchasable: true } });
  const InactiveProd = await db.product.count({
    where: { purchasable: false },
  });

  return { activeProd, InactiveProd };
};

async function AdminPage() {
  const { total_amount, total_sales } = await getSalesData();
  const { AvgValue, userCount } = await getCustomerData();
  const { activeProd, InactiveProd } = await getProductData();
  return (
    <div>
      <Text my={8} as="b" fontSize="2xl" fontFamily={"sans-serif"}>
        Admin Page 🚀
      </Text>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <DashboardCard
          title="Sales"
          description={` ${NUM_FORM(total_sales)} Orders `}
          body={CURRENCY_FORM(total_amount)}
        />
        <DashboardCard
          title="Customers"
          description={NUM_FORM(userCount)}
          body={CURRENCY_FORM(AvgValue)}
        />
        <DashboardCard
          title="Active Products"
          description={`Inactive Products  ${NUM_FORM(InactiveProd)}`}
          body={NUM_FORM(activeProd)}
        />
      </SimpleGrid>
    </div>
  );
}

export default AdminPage;

interface DashboardCardProps {
  title: string;
  description: string;
  body: string;
}

export function DashboardCard({
  title,
  description,
  body,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
        <p>{body}</p>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
    </Card>
  );
}
