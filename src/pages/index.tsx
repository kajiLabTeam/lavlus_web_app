import React from "react";
import type { NextPage } from "next";
import { Center, Heading, Stack } from "@chakra-ui/react";
import { LavlusIcon } from "@/common/icons";

const Landing: NextPage = () => {
  return (
    <Center w="100vw" h="100vh">
      <Stack align="center" gap={12}>
        <LavlusIcon w="200px" h="200px" />
        <Heading>Lavlus Web App</Heading>
      </Stack>
    </Center>
  );
};

export default Landing;
