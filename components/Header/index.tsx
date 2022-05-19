import React from 'react';
import NextLink from 'next/link';
import { HStack, Flex, Text, Link } from '@chakra-ui/react';

const links = [
  { key: 'home01', label: 'Home', href: '/home' },
  { key: 'home02', label: 'Home', href: '/home' },
  { key: 'home03', label: 'Home', href: '/home' },
  { key: 'home04', label: 'Home', href: '/home' },
];

export const Header = () => {
  return (
    <Flex
      // as="nav"
      align="center"
      justify="space-between"
      w="100%"
      wrap="wrap"
      px={6}
      py={2}
      bg="blue.800"
      color="white"
      position="fixed"
      zIndex="tooltip"
      backdropFilter="auto"
      backdropBlur="15px"
      backdropBrightness="115%"
    >
      <Text fontSize="2xl" fontWeight="bold">
        lavlus
      </Text>
      <HStack>
        {links.map(link => (
          <NextLink href={link.href} passHref key={link.key}>
            <Link>{link.label}</Link>
          </NextLink>
        ))}
      </HStack>
    </Flex>
  );
};
