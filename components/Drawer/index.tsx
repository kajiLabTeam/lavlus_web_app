import React from 'react';
import NextLink from 'next/link';
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
  useBreakpointValue,
} from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { SpinnerIcon } from '@chakra-ui/icons';
import { LavlusIcon } from '../../common/icons';
import { DrawerItem } from './DrawerItem';

const links = [
  { label: 'Home', href: '/', icon: AiFillHome },
  { label: 'Home2', href: '/home2', icon: AiFillHome },
  { label: 'Home3', href: '/home3', icon: AiFillHome },
];

export const Drawer = () => {
  const isXl = useBreakpointValue({ base: false, xl: true });
  return (
    <VStack px={6} spacing={6}>
      <Avatar size={isXl ? 'lg' : 'md'} />
      <Text fontSize="xl" d={{ base: 'none', xl: 'block' }}>
        @miyagawa
      </Text>
      <Text fontSize="xs" color="gray.400" d={{ base: 'none', xl: 'block' }}>
        Miyagawa Nobuhito
      </Text>

      <Divider my={10} />

      {links.map(link => (
        <DrawerItem
          key={link.href}
          href={link.href}
          icon={link.icon}
          selected={false}
        >
          {link.label}
        </DrawerItem>
      ))}

      <AspectRatio
        w={{ base: '48px', xl: '100%' }}
        ratio={{ base: 1 / 1, xl: 16 / 9 }}
      >
        <Image
          src="https://bit.ly/dan-abramov"
          borderRadius="xl"
          objectFit="cover"
        />
      </AspectRatio>

      <LavlusIcon boxSize="48px" />
      <Text fontSize="xl" fontWeight="bold" d={{ base: 'none', xl: 'block' }}>
        lavlus
      </Text>
      <Text fontSize="sm" color="gray.400" d={{ base: 'none', xl: 'block' }}>
        Powered by kaji-lab
      </Text>
    </VStack>
  );
};
