import React from 'react';
import {
  Text,
  Box,
  Heading,
  Stack,
  Grid,
  GridItem,
  Container,
  Flex,
  Image,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  HStack,
  AspectRatio,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

// other
// import dateFormat from "dateformat";

import { LavlusApi } from '@/utils';
// import { PeriodOfTimeInput, SensorsInput, Map } from "@/components";
import { MarkdownEditor, SimpleDatePickerControlled, SensorSingleInput, Map } from '@/components';
import { NewPageTitle, FormSection } from '@/components/pages/new';

// GeoJSON
import * as turf from '@turf/turf';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { NextPageWithLayoutAndPageExtraInfo, NewProjectValues } from '@/types';
import { json } from 'node:stream/consumers';

const schema: yup.SchemaOf<NewProjectValues> = yup.object().shape({
  name: yup.string().required('必須項目です'),
  overview: yup.string().required('必須項目です'),
  startDate: yup.string().required('必須項目です'),
  endDate: yup.string().required('必須項目です'),
  image: yup.string().required('必須項目です'),
  sensors: yup.array(),
  spatiotemporal: yup.object(),
});

const defaultOverview = `#### 以下はテンプレートです。
適当な内容に変更してください。

#### 概要
このプロジェクトは、愛知工業大学の家事研究室が行います。  
本プロジェクトは、テニスコート場での利用者の運動量を測定しその使用状況を調査する。  
その調査結果をもとに、より最適な環境改善計画を検討するためのプロジェクトです。

#### 期間や取得するデータの種類
本センシングプロジェクトの目標は、3ヶ月間の期間のデータを取得し各月ごとの使用状況の推移を調査するものとする。  
以下、プロジェクトの目標を協力者目線でわかりやすいように記述してください。

#### センサとその使用目的
本センシングプロジェクトでは以下のセンサの使用を使用します。  
また、その使用目的を示します。

|センサ|使用目的|備考|
|:---|:-----|:----|
|加速度センサ|運動量を測定するために使用します|特になし|
|ジャイロセンサ|運動量を測定の補助に使用します|特になし|
`;

const New: NextPageWithLayoutAndPageExtraInfo = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewProjectValues>({
    defaultValues: {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<NewProjectValues> = (values) => {
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
                defaultValue={defaultOverview}
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
              {/* <SimpleDatePickerControlled name="endDate" control={control} /> */}
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
              <AspectRatio w="100%" ratio={16 / 9}>
                <Map onChange={(geoJson) => console.log(geoJson)} />
              </AspectRatio>

              {/* <SimpleDatePickerControlled name="endDate" control={control} /> */}
              <FormErrorMessage>
                {errors.spatiotemporal && errors.spatiotemporal.message}
              </FormErrorMessage>
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
