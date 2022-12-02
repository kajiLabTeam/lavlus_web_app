import React from 'react';
import { NextPageWithLayoutAndPageExtraInfo, NewProjectValues } from '@/types';
import {
  Text,
  Heading,
  Stack,
  Container,
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  HStack,
  AspectRatio,
} from '@chakra-ui/react';
import {
  MarkdownEditor,
  MdTemplate,
  SimpleDatePickerControlled,
  SensorSingleInput,
  GeoJsonEditorControlled,
} from '@/components';
import { NewPageTitle, FormSection } from '@/components/pages/new';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { LavlusApi } from '@/utils';
import * as yup from 'yup';
import * as turf from '@turf/turf';

const schema: yup.SchemaOf<NewProjectValues> = yup.object().shape({
  name: yup.string().required('必須項目です'),
  overview: yup.string().required('必須項目です'),
  startDate: yup.string().required('必須項目です'),
  endDate: yup.string().required('必須項目です'),
  sensors: yup.array(),
  // sensors: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       type: yup.string().required('必須項目です'),
  //       refreshRate: yup.string().required('必須項目です'),
  //     })
  //   )
  //   .required('1つ以上のセンサを指定してください'),
  spatiotemporal: yup.object().shape({
    location: yup.object(),
    area: yup.object().required('エリアを定義してください'),
    ble: yup.object(),
    wifi: yup.object(),
    periods: yup.array(),
  }),
});

const New: NextPageWithLayoutAndPageExtraInfo = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewProjectValues>({
    defaultValues: {
      name: '',
      overview: MdTemplate,
      startDate: new Date(),
      endDate: new Date(),
      sensors: [],
      spatiotemporal: {},
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<NewProjectValues> = (values) => {
    values.spatiotemporal.location = turf.center(values.spatiotemporal.area);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxW="1000px" p={6}>
        <Stack spacing={24}>
          <NewPageTitle />
          <FormSection
            name="name"
            label="プロジェクト名"
            explanation="センシングプロジェクト名を4文字以上30文字以内で指定してください"
            image="/undraw/project_team.svg"
          >
            <FormControl isInvalid={!!errors.name}>
              <Input id="name" placeholder="プロジェクト名" {...register('name')} />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
          </FormSection>
          <FormSection
            name="overview"
            label="協力者への説明"
            explanation={`センシングプロジェクトの意図を協力者に伝わるようにテンプレートに添って記述してください。
              Markdown記法が使用できます。`}
            image="/undraw/preferences.svg"
          >
            <FormControl isInvalid={!!errors.overview}>
              <MarkdownEditor
                id="overview"
                placeholder="MarkDown形式で記述"
                defaultValue={MdTemplate}
                {...register('overview')}
              />
              <FormErrorMessage>{errors.overview && errors.overview.message}</FormErrorMessage>
            </FormControl>
          </FormSection>
          <FormSection
            name="startDate"
            label="プロジェクトの有効期間"
            explanation={`センシングプロジェクトの有効期間を指定してください。
              この有効期間内に入ると自動的にセンシングプロジェクトが開始され、終了するとセンシングプロジェクトは終了となります。`}
            image="/undraw/booked.svg"
          >
            <HStack justifyContent="center" gap={12}>
              <Stack w="300px">
                <Text fontWeight="bold" fontSize="xl">
                  開始日
                </Text>
                <FormControl isInvalid={!!errors.startDate}>
                  <SimpleDatePickerControlled name="startDate" control={control} />
                  <FormErrorMessage>
                    {errors.startDate && errors.startDate.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack w="300px">
                <Text fontWeight="bold" fontSize="xl">
                  終了日
                </Text>
                <FormControl isInvalid={!!errors.endDate}>
                  <SimpleDatePickerControlled name="endDate" control={control} />
                  <FormErrorMessage>{errors.endDate && errors.endDate.message}</FormErrorMessage>
                </FormControl>
              </Stack>
            </HStack>
          </FormSection>
          <FormSection
            name="sensors"
            label="センサ設定"
            explanation={`使用するセンサとそのリフレッシュレートを入力してください。
              センサを選択する際は、右上のスイッチを有効にした上でリフレッシュレートの数値を適切な値で入力してください。`}
            image="/undraw/settings.svg"
          >
            <FormControl isInvalid={!!errors.sensors}>
              {/* <SensorSingleInput /> */}
              <FormErrorMessage>{errors.sensors && errors.sensors.message}</FormErrorMessage>
            </FormControl>
          </FormSection>
          <FormSection
            name="spatiotemporal"
            label="時空間フェンシング"
            explanation={`協力者にとっていつ・どこでセンシングが行われているのか分からないという状況は非常に不安です。
              Lavlusは、時空間フェンシングによる時間帯とエリアの制限によってこの問題を緩和しています。`}
            image="/undraw/booked.svg"
          >
            <FormControl isInvalid={!!errors.spatiotemporal}>
              <Stack spacing={6}>
                <Heading as="h3" size="lg" borderLeft="36px solid #76E4F7" pl={2}>
                  エリアの設定
                </Heading>
                <Text fontSize="lg">
                  センシングプロジェクト実施するエリアを指定します。
                  <br />
                  左のメニューアイコンより範囲を指定してください。また、エリアは囲まれている必要があります。
                </Text>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <GeoJsonEditorControlled name="spatiotemporal.area" control={control} />
                </AspectRatio>
                <FormErrorMessage>
                  {errors.spatiotemporal?.area && (errors.spatiotemporal.area?.message as string)}
                </FormErrorMessage>
              </Stack>
            </FormControl>
          </FormSection>
          <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
            プロジェクトを作成
          </Button>
        </Stack>
      </Container>
    </form>
  );
};

New.needsAuthentication = true;

export default New;
