import { Nav } from "../components/Navbar";
import { Container } from "@chakra-ui/react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <Container my={6}>{children}</Container>
    </>
  );
}
