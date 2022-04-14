import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { Box, Image, AspectRatio, Heading } from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';
import useSWR from 'swr';
import { fetchWithToken } from '../../../utils';
import { Project } from '../../../types';

import { useRecoilValue } from 'recoil';
import { authState } from '../../../recoil/atoms';

const Dashboard: NextPage = () => {
  const auth = useRecoilValue(authState);
  const { data, error } = useSWR<Project>(
    ['/projects/j_Q3j0lJ9z', auth.token],
    fetchWithToken,
  );

  return (
    <Box bg="gray.200" borderRadius="3xl">
      {/* 背景画像 */}
      <Box h="300px" borderRadius="3xl" overflow="hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 252.52">
          <clipPath id="myClip">
            <path d="M1440,160l-60,10.7C1320,181,1200,203,1080,224s-240,43-360,16S480,139,360,117.3C240,96,120,128,60,144L0,160V0H1440Z" />
          </clipPath>
          <image
            xlinkHref={data?.image}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#myClip)"
          />
        </svg>
      </Box>
      {/* メインコンテンツ */}
      <Box mt="-300px" p={12} color="black">
        <AspectRatio w={280} ratio={16 / 9}>
          <Image
            src={data?.image}
            alt="ProjectImage"
            borderRadius="xl"
            objectFit="cover"
            border="solid 4px white"
          />
        </AspectRatio>

        <Heading
          as="h1"
          size="xl"
          pl={4}
          my={4}
          borderLeft="solid 12px #86D1C6"
        >
          {data?.name}
        </Heading>

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async context => ({
  props: {
    layout: 'dashboard',
    authenticated: true,
  },
});

export default Dashboard;
