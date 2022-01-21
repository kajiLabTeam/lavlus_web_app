import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  BoxProps,
  Icon,
  IconProps,
  Spacer,
  ChakraComponent,
  useBreakpointValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import _ from 'lodash';

type DrawerItemComponent = ChakraComponent<'div', {}>;

interface DrawerItemProps extends BoxProps {
  selected: boolean;
  href: string;
  icon: React.ElementType<any>;
}

export const DrawerItem: React.FC<DrawerItemProps> = ((
  props: DrawerItemProps,
) => {
  const router = useRouter();
  const { username, projectId } = router.query;
  const [selected, setSelected] = React.useState(props.selected);
  const isXl = useBreakpointValue({ base: false, xl: true });
  return (
    <Box
      as="button"
      w="100%"
      h={12}
      d="flex"
      justifyContent={{ base: 'center', xl: 'flex-start' }}
      alignItems="center"
      borderLeft={
        selected ? '5px solid #4FD1C5' : '5px solid rgba(255,255,255,0)'
      }
      color={selected ? 'white' : 'gray.400'}
      fontSize="lg"
      fontWeight={selected ? 'bold' : 'normal'}
      _hover={{
        bg: 'rgba(255, 255, 255, 0.25)',
        borderLeft: '5px solid #4FD1C5',
      }}
      transition="background-color 0.5s"
      onClick={() => {
        setSelected(!selected);
        router.replace(`/${username}/${projectId}`);
      }}
      {..._.omit(props, 'icon')}
    >
      <Icon as={props.icon} boxSize="1.5em" mx={4} />
      {isXl && props.children}
    </Box>
  );
}) as DrawerItemComponent;
