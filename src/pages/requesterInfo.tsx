import React from 'react';
import {
  Container,
  Center,
  Stack,
  Input,
  Textarea,
  Button,
  Text,
  Heading,
  Radio,
  RadioGroup,
  FormErrorMessage,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { BirthdayPicker } from 'react-birthday-picker';
// RHF
import { RequesterInfo } from '@/types';
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// API
import { auth } from '@/utils';
import { Lavlus } from '@/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
// Hooks
import { useToast } from '@chakra-ui/react';
// Utils
import { parse } from 'date-fns';
import { useRouter } from 'next/router';
// NextPage
import { NextPageWithLayoutAndPageExtraInfo } from '@/types';
import { StandardLayout } from '@/layouts';

// FIXME: ちゃんと型定義をあわせる
// @ts-ignore
const schema: yup.SchemaOf<Omit<RequesterInfo, 'createdAt' | 'updatedAt'>> = yup.object().shape({
  realm: yup.string().required('必須項目です'),
  gender: yup
    .mixed<'male' | 'female' | 'other'>()
    .oneOf(['male', 'female', 'other'])
    .required('必須項目です'),
  organization: yup.string().required('必須項目です'),
  url: yup.string().required('必須項目です'),
  birthDate: yup.date().required('必須項目です'),
  introduction: yup.string(),
});

const RequesterInfo: NextPageWithLayoutAndPageExtraInfo = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast({ duration: 5000, position: 'bottom-right' });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RequesterInfo>({
    defaultValues: {
      realm: '',
      gender: 'male',
      organization: '',
      url: '',
      birthDate: '',
      introduction: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RequesterInfo> = async (values) => {
    // Stringの生年月日をDateに変換
    if (typeof values.birthDate === 'string') {
      values.birthDate = parse(values.birthDate, 'yyyy/MM/dd', new Date());
    }
    // Debug
    console.log(JSON.stringify(values, null, 2));
    // APIにフォーム送信
    try {
      const data = await Lavlus.registerRequesterInfo(values);
      if (data && user) {
        router.replace(`/${user.displayName}`);
        toast({
          title: '依頼者登録に成功しました',
          status: 'success',
        });
      } else {
        toast({
          title: '不明なエラーが発生しました',
          status: 'error',
        });
      }
    } catch (err) {
      toast({
        title: 'サーバーとの通信に失敗しました',
        status: 'error',
      });
    }
  };

  const onError: SubmitErrorHandler<RequesterInfo> = (errors) => {
    toast({
      title: '入力に不備があります',
      status: 'warning',
    });
  };

  return (
    <Container maxW="1000px">
      <Center h="100%" py={16}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Stack gap={4} align="center">
            <Heading size="3xl">依頼者登録 🎓</Heading>
            <Text maxW="500px">
              Lavlusで依頼者として利用を行うには依頼者登録をする必要があります。
              これは、協力者にとってどんな人物からの依頼なのかを判断するために必要な情報です。以下のフォームを入力し、続行してください。
            </Text>

            <FormControl isInvalid={!!errors.realm}>
              <FormLabel htmlFor="realm">
                <Text borderLeft="12px solid #ED8936" pl="12px" fontWeight="bold" fontSize="lg">
                  氏名
                </Text>
              </FormLabel>
              <Input id="realm" placeholder="realm" {...register('realm')} />
              <FormErrorMessage>{errors.realm && errors.realm.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.realm}>
              <FormLabel htmlFor="realm">
                <Text borderLeft="12px solid #ED8936" pl="12px" fontWeight="bold" fontSize="lg">
                  性別
                </Text>
              </FormLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <RadioGroup onChange={onChange} value={value}>
                    <Stack direction="row">
                      <Radio value="male">男性</Radio>
                      <Radio value="female">女性</Radio>
                      <Radio value="other">その他</Radio>
                    </Stack>
                  </RadioGroup>
                )}
              />
              <FormErrorMessage>{errors.realm && errors.realm.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.organization}>
              <FormLabel htmlFor="organization">
                <Text borderLeft="12px solid #ED8936" pl="12px" fontWeight="bold" fontSize="lg">
                  所属機関
                </Text>
              </FormLabel>
              <Input id="organization" placeholder="organization" {...register('organization')} />
              <FormErrorMessage>
                {errors.organization && errors.organization.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.url}>
              <FormLabel htmlFor="url">
                <Text borderLeft="12px solid #ED8936" pl="12px" fontWeight="bold" fontSize="lg">
                  Webページ
                </Text>
              </FormLabel>
              <Input id="url" placeholder="url" {...register('url')} />
              <FormErrorMessage>{errors.url && errors.url.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.birthDate}>
              <FormLabel htmlFor="birthDate">
                <Text borderLeft="12px solid #ED8936" pl="12px" fontWeight="bold" fontSize="lg">
                  生年月日
                </Text>
              </FormLabel>
              <Controller
                control={control}
                name="birthDate"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <BirthdayPicker
                    onChange={onChange}
                    placeHolders={['日', '月', '年']}
                    style={{ width: '400px' }}
                  />
                )}
              />
              <FormErrorMessage>{errors.birthDate && errors.birthDate.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.introduction}>
              <FormLabel htmlFor="introduction">
                <Text borderLeft="12px solid #ED8936" pl="12px" fontWeight="bold" fontSize="lg">
                  自己紹介
                </Text>
              </FormLabel>
              <Textarea
                id="introduction"
                placeholder="introduction"
                {...register('introduction')}
              />
              <FormErrorMessage>
                {errors.introduction && errors.introduction.message}
              </FormErrorMessage>
            </FormControl>

            <Button w="100%" mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
              依頼者登録をする
            </Button>
          </Stack>
        </form>
      </Center>
    </Container>
  );
};
RequesterInfo.getLayout = (page: React.ReactElement) => {
  return <StandardLayout>{page}</StandardLayout>;
};
export default RequesterInfo;
