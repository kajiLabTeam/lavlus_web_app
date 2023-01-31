import { Box, Center, Stack, Text, Grid, GridItem, Avatar, HStack, Link } from '@chakra-ui/react';
import { LavlusIcon } from '@/components/icons';

export const StandardLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Grid minH="100vh" templateRows="auto 1fr auto">
      <HStack p={4} py={3} top={0} position="sticky" bg="white" borderBottom="1px solid #EDF2F7">
        <Link href="/">
          <HStack>
            <LavlusIcon w="36px" h="36px" />
            <Text fontSize="2xl" fontWeight="bold">
              lavlus
            </Text>
          </HStack>
        </Link>
      </HStack>

      {children}

      <Stack h="100px" bottom={0} position="sticky" bg="#F0F0F0" align="flex-end">
        <Grid
          templateAreas={`
          "text logo"
          "link logo"
          `}
          templateRows="1fr, 1fr"
          templateColumns="auto, 64px"
          gap={2}
          my="auto"
          pr={4}
        >
          <GridItem area={'text'}>
            <Text fontSize="lg">Powered By Kaji Lab.</Text>
          </GridItem>
          <GridItem area={'link'}>
            <Link href="https://kajilab.net">https://kajilab.net</Link>
          </GridItem>
          <GridItem area={'logo'}>
            <Center w="100%" height="100%">
              <Avatar size="lg" src="https://kajilab.net/hpg/img/main/logo.jpg" />
            </Center>
          </GridItem>
        </Grid>
      </Stack>
    </Grid>
  );
};
