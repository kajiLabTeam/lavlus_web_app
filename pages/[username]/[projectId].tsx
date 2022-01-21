import type { NextPage, GetServerSideProps } from 'next';
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
  Container,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Header, Drawer } from '../../components';

export const getServerSideProps: GetServerSideProps = async context => ({
  props: {
    layout: 'dashboard',
  },
});

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { username, projectId } = router.query;
  return (
    <Box h="2000%" bg="gray.200" borderRadius="3xl">
      <Box w="100%" h="300px" borderRadius="3xl" overflow="hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 252.52">
          <clipPath id="myClip">
            <path d="M1440,160l-60,10.7C1320,181,1200,203,1080,224s-240,43-360,16S480,139,360,117.3C240,96,120,128,60,144L0,160V0H1440Z" />
          </clipPath>
          <image
            xlinkHref="https://photosku.com/images_file/images/i007_763.jpg"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#myClip)"
          />
        </svg>
      </Box>

      <Box mt="-300px" color="black">
        aaafegrhtnyjmfuki,lo.
      </Box>
    </Box>
  );
};

export default Dashboard;
