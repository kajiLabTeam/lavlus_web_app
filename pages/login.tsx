import React from 'react';
import type { NextPage } from 'next';
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
} from '@chakra-ui/react';
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

const Login: NextPage = () => {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [flag, setFlag] = useBoolean(false);
  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  return (
    <Center bg="blue.800" minW="container.sm" minH="100vh" color="white">
      <Box mx={24} bg="gray.400" borderRadius="3xl" overflow="hidden">
        <Grid h="500px" templateColumns="repeat(2, 1fr)">
          <GridItem>
            <Image
              w="100%"
              h="100%"
              objectFit="cover"
              src="https://www.pakutaso.com/shared/img/thumb/PAK76_aoihikarito220150218182340_TP_V.jpg"
            ></Image>
          </GridItem>
          <GridItem>
            <Stack spacing={12} px={12}>
              <Heading>Login</Heading>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  const data = await LavlusApi.login(
                    values.email,
                    values.password,
                  );
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
                    <InputControl name="email" label="Email" />
                    <InputControl
                      name="password"
                      label="Password"
                      inputProps={{ type: 'password' }}
                    />
                    <PercentComplete progressProps={{ hasStripe: false }} />
                    {flag && (
                      <Text color="red.500">
                        EmailかPasswordが正しくありません
                      </Text>
                    )}
                    <ButtonGroup>
                      <SubmitButton>ログイン</SubmitButton>
                    </ButtonGroup>
                  </Stack>
                )}
              </Formik>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
};

export default Login;
