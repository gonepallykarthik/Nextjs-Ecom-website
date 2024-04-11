"use client";

import { Link } from "@chakra-ui/next-js";

export default function Home() {
  return (
    <div>
      <h1>welcome to this store application</h1>
      <Link href="/Users" color="blue.400" _hover={{ color: "blue.500" }}>
        Users
      </Link>
    </div>
  );
}
