import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Text,
  VStack,
  Avatar,
  Divider,
  Image,
  AspectRatio,
  useBreakpointValue,
  BoxProps,
  ChakraComponent,
} from '@chakra-ui/react';
import { AiFillHome, AiFillDatabase, AiFillDashboard } from 'react-icons/ai';
import { LavlusIcon } from '../../common/icons';
import { DrawerItem } from './DrawerItem';

const links = [
  { key: 'bdfwtgh', label: 'Home', href: '', icon: AiFillHome },
  { key: 'frgetgn', label: 'Home3', href: 'home3', icon: AiFillDashboard },
  { key: 'vbnjnmk', label: 'Data', href: 'data', icon: AiFillDatabase },
];

export const Drawer = ((props: BoxProps) => {
  const router = useRouter();
  const paths = router.pathname.split('/');
  const path = paths[3] === undefined ? '' : paths[3];
  const isXl = useBreakpointValue({ base: false, xl: true });

  return (
    <Box {...props}>
      <VStack spacing={6}>
        <Avatar size="lg" />
        <Text fontSize="xl" d={{ base: 'none', xl: 'block' }}>
          @miyagawa
        </Text>
        <Text fontSize="xs" color="gray.400" d={{ base: 'none', xl: 'block' }}>
          Miyagawa Nobuhito
        </Text>

        <Divider my={10} />

        {links.map(link => (
          <DrawerItem
            key={link.key}
            href={link.href}
            icon={link.icon}
            selected={path === link.href}
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
            alt="ProjectImage"
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
    </Box>
  );
}) as ChakraComponent<'div', {}>;
