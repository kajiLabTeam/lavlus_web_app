import React from 'react';
import type { NextPage } from 'next';
import { Container, Center, Heading, Stack, Link } from '@chakra-ui/react';
import { LavlusIcon } from '@/components/icons';
import { useRouter } from 'next/router';

import { NextPageWithLayoutAndPageExtraInfo } from '@/types';
import { StandardLayout } from '@/layouts';

const LandingPage: NextPageWithLayoutAndPageExtraInfo = () => {
  const router = useRouter();
  return (
    <Container maxW="1000px">
      <Center h="100%" py={16}>
        <Stack align="center" gap={12}>
          <LavlusIcon w="200px" h="200px" />
          <Heading>Lavlus Web App</Heading>
          <Link onClick={() => router.push('/login')}>ログインページへ</Link>
        </Stack>
      </Center>
    </Container>
  );
};

LandingPage.getLayout = (page: React.ReactElement) => {
  return <StandardLayout>{page}</StandardLayout>;
};
export default LandingPage;
