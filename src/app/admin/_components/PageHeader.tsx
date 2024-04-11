// import React from 'react'

import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

function PageHeader({ children }: { children: ReactNode }) {
  return (
    <div>
      <Text as="b" fontSize={"3xl"} mb={4}>
        {children}
      </Text>
    </div>
  );
}

export default PageHeader;
