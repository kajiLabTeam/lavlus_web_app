import { useRouter } from 'next/router';
// components
import {
  Box,
  Grid,
  GridItem,
  Container,
  BoxProps,
  ChakraComponent,
} from '@chakra-ui/react';
import { Header, Drawer, Notification } from '../../components';

export const DashboardLayout = ((props: BoxProps) => {
  const router = useRouter();
  const { username, projectId } = router.query;
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
      <Container as="main" maxW="1440px" p={0} centerContent>
        {/* Gridで表示とサイズを調整 */}
        <Grid
          w="100%"
          py={24}
          px={6}
          gap={6}
          templateColumns={{
            base: '60px 1fr',
            xl: '140px 1fr 180px',
          }}
          templateRows="auto"
        >
          <GridItem as="section">
            <Drawer position="sticky" top={24} />
          </GridItem>
          <GridItem as="section">{props.children}</GridItem>
          <GridItem as="aside" d={{ base: 'none', xl: 'block' }}>
            <Notification position="sticky" top={24} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}) as ChakraComponent<'div', {}>;
