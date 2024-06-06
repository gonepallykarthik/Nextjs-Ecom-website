"use client";

import { DeleteOrder } from "../../_actions/deleteOrder";
import { useRouter } from "next/navigation";

export function DeleteOrderAction({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await DeleteOrder(id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting Order:", error);
    }
  };

  return (
    <button
      className="bg-red-600 p-2 rounded-md text-white "
      onClick={handleDelete}
    >
      Delete Order
    </button>
  );
}
