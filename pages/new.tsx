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
import Editor, { theme } from 'rich-markdown-editor';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/atoms';
import { LavlusApi } from '../utils';

import {
  InputControl,
  PercentComplete,
  ResetButton,
  SubmitButton,
  FormControl,
} from 'formik-chakra-ui';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Map } from '../components/Map';

import dynamic from 'next/dynamic';
// const Map = dynamic(() => import('../components/Map'), { ssr: false });

const sample = `
# Heading 1

## Heading 2

### Heading 3

#### Heading 4
`;

const New: NextPage = () => {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [flag, setFlag] = useBoolean(false);
  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  // const Map = React.useMemo(
  //   () =>
  //     dynamic(() => import('../components/Map/Map'), {
  //       loading: () => <p>A map is loading</p>,
  //       ssr: false,
  //     }),
  //   [],
  // );

  return (
    <Grid templateRows="auto" templateColumns="180px 1fr">
      <GridItem bg="gray.600">
        <Stack h="100%" p={6} spacing={6} position="fixed" color="white">
          <Text fontSize="xl">はじめましょう</Text>
          <Text fontSize="xl">有効期限</Text>
          <Text fontSize="xl">概要</Text>
          <Text fontSize="xl">センサ</Text>
          <Text fontSize="xl">エリア</Text>
          <Text fontSize="xl">時間帯</Text>
        </Stack>
      </GridItem>
      <GridItem>
        <Container as="main" maxW="1000px" p={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              const data = await LavlusApi.login(values.email, values.password);
              if (data) {
                setAuth({ ...data, isSignedIn: true });
                router.push('/user');
              } else {
                setFlag.on();
              }
            }}
          >
            {({ handleSubmit, values }) => (
              <Stack as="form" onSubmit={handleSubmit as any} spacing={6}>
                <Heading as="h3" borderLeft="12px solid #ED8936" pl={2}>
                  はじめましょう!
                </Heading>
                <InputControl
                  name="email"
                  inputProps={{
                    variant: 'filled',
                    size: 'lg',
                    placeholder: 'email',
                  }}
                />
                <Box h="80px"></Box>
                <Heading as="h3" borderLeft="12px solid #ED8936" pl={2}>
                  有効期限
                </Heading>
                <InputControl name="email" inputProps={{ variant: 'filled' }} />
                <Box h="80px"></Box>
                <Heading as="h3" borderLeft="12px solid #ED8936" pl={2}>
                  有効期限
                </Heading>
                <InputControl name="email" inputProps={{ variant: 'filled' }} />
                {/* CSS Reset */}
                <Box
                  bg="gray.100"
                  borderRadius={8}
                  padding={8}
                  sx={{
                    '& h1': {
                      fontSize: '2rem',
                    },
                    '& h2': {
                      fontSize: '1.5rem',
                    },
                    '& h3': {
                      fontSize: '1.17rem',
                    },
                    '& h4': {
                      fontSize: '1rem',
                    },
                  }}
                >
                  <Editor
                    defaultValue={sample}
                    theme={{
                      ...theme,
                      background: '#EDF2F7',
                    }}
                  />
                </Box>
                <Heading as="h3" borderLeft="12px solid #ED8936" pl={2}>
                  GeoJSON
                </Heading>
                <Box w="100%" h="600px">
                  <Map />
                </Box>
              </Stack>
            )}
          </Formik>
        </Container>
      </GridItem>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async context => ({
  props: {
    layout: 'standard',
    authenticated: true,
  },
});

export default New;
