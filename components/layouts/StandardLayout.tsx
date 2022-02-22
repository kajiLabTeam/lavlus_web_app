import { Box, Container, BoxProps, ChakraComponent } from '@chakra-ui/react';
import { Header } from '..';

export const StandardLayout = ((props: BoxProps) => {
  return (
    <Box
      bg="blue.800"
      minW="container.sm"
      minH="100vh"
      color="white"
      {...props}
    >
      <Header />
      {/* 最大幅を設定 */}
      <Container as="main" maxW="1440px" pt={24}>
        {props.children}
      </Container>
    </Box>
  );
}) as ChakraComponent<'div', {}>;
