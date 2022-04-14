import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import {
  Text,
  Box,
  Image,
  Heading,
  Stack,
  Grid,
  GridItem,
  ButtonGroup,
  Center,
  useBoolean,
  Container,
  Flex,
  CSSReset,
} from '@chakra-ui/react';

import { Map } from '../components/Map';

const Test: NextPage = () => {
  return (
    <Box w="600px" h="400px">
      <Map />
    </Box>
  );
};

// export const getServerSideProps: GetServerSideProps = async context => ({
//   props: {
//     // layout: 'standard',
//     authenticated: false,
//   },
// });

export default Test;
