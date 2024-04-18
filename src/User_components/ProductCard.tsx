import { CURRENCY_FORM } from "@/app/formaters/format";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";

type CardDetailsProps = {
  id: string;
  title: string;
  desc: string;
  img: string;
  price: Number;
};

function ProductCard({ id, title, desc, img, price }: CardDetailsProps) {
  return (
    <Card size="sm" maxW="300px">
      <CardBody>
        <Image src={img} alt={title} borderRadius="md" />
        <Stack mt="6" spacing="2">
          <Heading size="md">{title}</Heading>
          <Text>{desc}</Text>

          {/* price */}
          <Text color="black" fontSize="md">
            {CURRENCY_FORM(Number(price))}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button fontSize="small" variant="solid" colorScheme="blue">
            <Link href={`/products/${id}/purchase`}>Buy now</Link>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
