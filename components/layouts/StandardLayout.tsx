import { Box, Container, BoxProps, ChakraComponent } from "@chakra-ui/react";
import { Header } from "..";

export const StandardLayout = ((props: BoxProps) => {
  return (
    <Box w="100vw" minH="100vh" {...props}>
      <Header />
      {/* ヘッダの分のマージンを取る */}
      <Box as="main" pt="52px">
        {props.children}
      </Box>
    </Box>
  );
}) as ChakraComponent<"div", {}>;
