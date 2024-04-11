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
import { AddProduct } from "../_actions/product";
import { useFormState, useFormStatus } from "react-dom";

function ProductForm() {
  const [error, action] = useFormState(AddProduct, {});

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
              />
              {error.desc && <Text color="red.500">{error.desc}</Text>}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="File">File</FormLabel>
              <Input
                required
                id="product-file"
                name="product_file"
                type="file"
              ></Input>
              {error.file && <Text color="red.500">{error.file}</Text>}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="File">Image</FormLabel>
              <Input
                required
                id="product-image"
                name="product_img"
                type="file"
              ></Input>
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
