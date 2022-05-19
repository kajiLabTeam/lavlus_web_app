import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import {
  Text,
  Box,
  Select,
  Switch,
  HStack,
  Input,
  Image,
  Heading,
  Stack,
  Grid,
  GridItem,
  ButtonGroup,
  Button,
  Center,
  useBoolean,
  Container,
  Flex,
  CSSReset,
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
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { PeriodOfTimeInput } from '../components';
import { SimpleDatePicker, CustomEditor, SensorInput } from '../common';
import * as turf from '@turf/turf';

import { Map } from '../components/Map';
import { date } from 'yup/lib/locale';

const sample = `
# (´・ω・｀)
`;

const New: NextPage = () => {
  // const router = useRouter();
  // const [auth, setAuth] = useRecoilState(authState);
  // const [flag, setFlag] = useBoolean(false);
  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

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
              // if (data) {
              //   setAuth({ ...data, isSignedIn: true });
              //   router.push('/user');
              // } else {
              //   setFlag.on();
              // }
            }}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Stack as="form" onSubmit={handleSubmit as any} spacing={6}>
                <Button onClick={() => console.log(values)} />
                <Heading as="h3" borderLeft="12px solid #ED8936" pl={2}>
                  はじめましょう!
                </Heading>

                <InputControl
                  name="name"
                  inputProps={{
                    variant: 'filled',
                    size: 'lg',
                    placeholder: 'タイトル',
                  }}
                />

                <Box h="80px"></Box>

                <Heading as="h3" borderLeft="12px solid #ED8936" pl={2}>
                  有効期限
                </Heading>

                <Flex>
                  <SimpleDatePicker
                    onChange={date => setFieldValue('startDate', date)}
                  />
                  <SimpleDatePicker
                    onChange={date => setFieldValue('endDate', date)}
                  />
                </Flex>

                <Box h="80px"></Box>

                <SensorInput
                  name="加速度センサ"
                  onChange={(event: any) => console.log(event)}
                />

                <PeriodOfTimeInput />

                <Heading as="h3" borderLeft="12px solid #ED8936" pl={2}>
                  概要
                </Heading>

                {/* CSS Reset */}
                <CustomEditor
                  defaultValue={sample}
                  onChange={value => setFieldValue('overview', value())}
                />

                <Heading as="h3" borderLeft="12px solid #ED8936" pl={2}>
                  GeoJSON
                </Heading>

                <Box w="100%" h="600px">
                  <Map
                    onChange={(value: any) => {
                      setFieldValue('geo', value);
                      setFieldValue('location', turf.center(value));
                    }}
                  />
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
