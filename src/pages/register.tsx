import React from 'react';
import {
  Container,
  Center,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Flex,
  Grid,
  Heading,
  Image,
  Button,
  Text,
  Card,
  CardBody,
  useDisclosure,
  Link,
  useToast,
} from '@chakra-ui/react';

import { SimpleDatePickerControlled } from '@/components';

import { useRouter } from 'next/router';

import { NextPageWithLayoutAndPageExtraInfo } from '@/types';

import { RequesterInfo } from '@/types';
import { useForm, Controller } from 'react-hook-form';

const Register: NextPageWithLayoutAndPageExtraInfo = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RequesterInfo>({
    defaultValues: {
      realm: '',
      gender: 'male',
      introduction: '',
      organization: '',
      url: '',
      birthDate: new Date(),
    },
  });

  const onSubmit = (values: any) => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  };

  return (
    <Center w="100%" minH="100vh" position="relative">
      <Image
        src="/register_bg.jpg"
        alt="register_bg"
        w="100%"
        h="100%"
        position="absolute"
        backgroundSize="cover"
        zIndex={1}
      />
      <Container maxW="1000px" position="relative" zIndex={100}>
        <Card backgroundColor="white">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!errors.realm}>
                <FormLabel htmlFor="realm">名前 (本名)</FormLabel>
                <Input id="realm" placeholder="名前 (本名)" {...register('realm')} />
                <FormErrorMessage>{errors.realm && errors.realm.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!errors.gender}>
                <FormLabel htmlFor="gender">性別</FormLabel>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <RadioGroup
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                    >
                      <Stack direction="row">
                        <Radio value="male">男</Radio>
                        <Radio value="female">女</Radio>
                        <Radio value="other">その他</Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                />
                <FormErrorMessage>{errors.gender && errors.gender.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!errors.introduction}>
                <FormLabel htmlFor="introduction">自己紹介文</FormLabel>
                <Textarea
                  id="introduction"
                  placeholder="自己紹介文"
                  {...register('introduction')}
                />
                <FormErrorMessage>
                  {errors.introduction && errors.introduction.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!errors.organization}>
                <FormLabel htmlFor="organization">組織</FormLabel>
                <Input id="organization" placeholder="組織" {...register('organization')} />
                <FormErrorMessage>
                  {errors.organization && errors.organization.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!errors.url}>
                <FormLabel htmlFor="url">組織</FormLabel>
                <Input id="url" placeholder="ホームページ" {...register('url')} />
                <FormErrorMessage>{errors.url && errors.url.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!errors.birthDate}>
                <FormLabel htmlFor="birthDate">誕生日</FormLabel>
                <SimpleDatePickerControlled name="birthDate" control={control} />
                <FormErrorMessage>{errors.birthDate && errors.birthDate.message}</FormErrorMessage>
              </FormControl>

              <Button type="submit">submit</Button>
            </form>
          </CardBody>
        </Card>
      </Container>
    </Center>
  );
};

Register.needsAuthentication = true;

export default Register;
