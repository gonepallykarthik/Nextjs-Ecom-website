"use client";

import { DeleteUser } from "../../_actions/deleteUser";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

export function DeleteUserAction({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await DeleteUser(id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <button
      className="bg-red-600 p-2 rounded-md text-white "
      disabled={disabled}
      onClick={handleDelete}
    >
      Delete User
    </button>
  );
}
