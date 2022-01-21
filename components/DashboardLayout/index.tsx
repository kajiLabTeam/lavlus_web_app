import type { NextPage } from 'next';
import { useRouter } from 'next/router';
// components
import {
  Box,
  HStack,
  Flex,
  Text,
  Link,
  Grid,
  VStack,
  GridItem,
  Avatar,
  Divider,
  Button,
  Spacer,
  Image,
  AspectRatio,
  Img,
  Center,
  Container,
  BoxProps,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Header, Drawer } from '../../components';

const notificationItems = [
  {
    key: 'notification01',
    icon: 'delete',
    status: 'Delete Request',
    userId: 'fsdfdsf-sdfdsf-sdf',
  },
  {
    key: 'notification02',
    icon: 'delete',
    status: 'Delete Request',
    userId: 'fsdfdsf-sdfdsf-sdf',
  },
  {
    key: 'notification03',
    icon: 'delete',
    status: 'Delete Request',
    userId: 'fsdfdsf-sdfdsf-sdf',
  },
  {
    key: 'notification04',
    icon: 'delete',
    status: 'Delete Request',
    userId: 'fsdfdsf-sdfdsf-sdf',
  },
];

export const DashboardLayout: React.FC<BoxProps> = ({ children }) => {
  const router = useRouter();
  const { username, projectId } = router.query;
  return (
    <Box bg="blue.800" h="100vh" color="white">
      <Header />
      <Container maxW="container.xl" pt={24}>
        <Flex>
          <Box>
            <Drawer />
          </Box>
          <Box flex={1}>{children}</Box>
          <Box px={6} colSpan={1}>
            <Notification />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

const Notification = () => {
  return (
    <>
      <Center w="100%" h={10} bg="gray.500" borderRadius="full" mb={12}>
        <Text fontSize="lg" fontWeight="bold">
          Notifications
        </Text>
      </Center>

      <VStack h="25%" justifyContent="space-between">
        {notificationItems.map(item => (
          <Grid
            templateRows="repeat(2, 16px)"
            templateColumns="32px 1fr"
            gap={2}
            key={item.key}
          >
            <GridItem rowSpan={2} colSpan={1}>
              <DeleteIcon w="90%" h="90%" />
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Delete Request</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize="xs" color="gray.400">
                User: rvevf-vresv-vresv
              </Text>
            </GridItem>
          </Grid>
        ))}
      </VStack>
    </>
  );
};
