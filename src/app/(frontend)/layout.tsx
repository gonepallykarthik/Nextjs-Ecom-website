import { UserNav } from "../../User_components/UserNav";
import { Container } from "@chakra-ui/react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserNav />

      <Container my={10} maxW="container.xl">
        {children}
      </Container>
    </>
  );
}
