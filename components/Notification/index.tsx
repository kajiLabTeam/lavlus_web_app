// components
import {
  Box,
  Text,
  Grid,
  VStack,
  GridItem,
  Center,
  BoxProps,
  ChakraComponent,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

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

export const Notification = ((props: BoxProps) => {
  return (
    <Box Box {...props}>
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
                User: {item.userId}
              </Text>
            </GridItem>
          </Grid>
        ))}
      </VStack>
    </Box>
  );
}) as ChakraComponent<'div', {}>;
