"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AddProduct, EditProduct } from "../_actions/product";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";

function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product == null ? AddProduct : EditProduct.bind(null, product.id),
    {}
  );

  return (
    <div>
      <form action={action}>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isRequired>
              <FormLabel htmlFor="Product Name">Product Name</FormLabel>
              <Input
                required
                id="product-name"
                name="product_name"
                type="text"
                defaultValue={product?.name || ""}
              />
              {error.name && <Text color="red.500">{error.name}</Text>}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="Product price">Product Price</FormLabel>
              <Input
                required
                id="product-price"
                name="product_price"
                type="number"
                defaultValue={product?.price || ""}
              />
              {error.price && <Text color="red.500">{error.price}</Text>}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="Product description">
                Product Description
              </FormLabel>
              <Input
                required
                id="product-desc"
                name="product_desc"
                type="text"
                defaultValue={product?.description || ""}
              />
              {error.desc && <Text color="red.500">{error.desc}</Text>}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="File">File</FormLabel>
              <Input
                required={product == null}
                id="product-file"
                name="product_file"
                type="file"
              ></Input>
              {product != null && (
                <div className="text-muted-foreground">{product?.filePath}</div>
              )}
              {error.file && <Text color="red.500">{error.file}</Text>}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="File">Image</FormLabel>
              <Input
                required={product == null}
                id="product-image"
                name="product_img"
                type="file"
              ></Input>
              {product != null && (
                <div className="text-muted-foreground">
                  {product?.imagePath}
                </div>
              )}
              {error.image && <Text color="red.500">{error.image}</Text>}
            </FormControl>
          </Stack>
          <Stack spacing="6">
            <SubmitButton />
          </Stack>
        </Stack>
      </form>
    </div>
  );
}

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" bgColor="pink" color="black" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};

export default ProductForm;
