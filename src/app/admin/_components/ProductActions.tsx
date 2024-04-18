"use client";

import { deleteProduct } from "../_actions/product";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

export function DeleteItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    console.log("first");
  };

  return (
    <Button disabled={disabled} onClick={handleDelete}>
      Delete
    </Button>
  );
}
