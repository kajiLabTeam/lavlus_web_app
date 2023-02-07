import React from 'react';
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
  SensorMultiInputControlled,
  GeoJsonEditorControlled,
  PeriodMultiInputControlled,
} from '@/components';
import { NewPageTitle, FormSection } from '@/components/pages/new';
// RHF
import { NewProjectValues } from '@/types';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// API
import { auth } from '@/utils';
import { Lavlus } from '@/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
// Hooks
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
// Utils
import { addMonths } from 'date-fns';
import * as turf from '@turf/turf';
import _ from 'lodash';
// NextPage
import { NextPageWithLayoutAndPageExtraInfo } from '@/types';

// FIXME: ちゃんと型定義をあわせる
// @ts-ignore
const schema: yup.SchemaOf<NewProjectValues> = yup.object().shape({
  name: yup
    .string()
    .required('必須項目です')
    .min(4, '4文字以上で入力してください')
    .max(30, '30文字以下で入力してください'),
  overview: yup
    .string()
    .required('必須項目です')
    .min(10, '10文字以上で入力してください')
    .max(2000, '2000文字以下で入力してください'),
  startDate: yup.date().required('必須項目です'),
  endDate: yup.date().required('必須項目です'),
  sensors: yup
    .array()
    .of(
      yup.object().shape({
        type: yup.string().required('必須項目です'),
        refreshRate: yup.number().required('必須項目です'),
      })
    )
    .required('1つ以上のセンサを指定してください'),
  spatiotemporal: yup.object().shape({
    location: yup.object(),
    area: yup.object().required('エリアを定義してください'),
    ble: yup.object(),
    wifi: yup.object(),
    periods: yup.array(),
  }),
});

const New: NextPageWithLayoutAndPageExtraInfo = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast({ duration: 5000, position: 'bottom-right' });

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
      endDate: addMonths(new Date(), 1),
      sensors: [],
      spatiotemporal: {
        ble: {},
        wifi: {},
        periods: [
          {
            interval: 1,
            entity: 'week',
            dayOfWeek: ['mon', 'tue', 'wed'],
            startTime: '10:00:00',
            endTime: '14:00:00',
          },
        ],
      },
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<NewProjectValues> = async (values) => {
    // 重心座標を追加
    const centerGeoJSON = turf.center(values.spatiotemporal.area);
    values.spatiotemporal.location = {
      latitude: centerGeoJSON.geometry.coordinates[1],
      longitude: centerGeoJSON.geometry.coordinates[0],
    };
    // ISO Date Time に変換
    if (values.startDate instanceof Date) values.startDate = values.startDate.toISOString();
    if (values.endDate instanceof Date) values.endDate = values.endDate.toISOString();
    // entityがdayの場合は、dayOfWeekを空配列に
    values.spatiotemporal.periods = values.spatiotemporal.periods.map((period) => {
      if (period.entity === 'day') return { ...period, dayOfWeek: [] };
      return period;
    });
    // Debug
    console.log(JSON.stringify(values, null, 2));
    // APIにフォーム送信
    try {
      const data = await Lavlus.createProject(values);
      if (data && user) {
        router.replace(`/${user.displayName}`);
        toast({
          title: 'プロジェクトの作成に成功しました',
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
  const onError: SubmitErrorHandler<NewProjectValues> = (errors) => {
    toast({
      title: '入力に不備があります',
      status: 'warning',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Container maxW="1000px" py={6} px={0}>
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
              <SensorMultiInputControlled name="sensors" control={control} />
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
                  時間帯の設定
                </Heading>
                <Text fontSize="lg">
                  センシングプロジェクトが開始される時間帯を入力してください。
                  <br />
                  毎日の9:00~10:00に加えて、隔週の土曜日の16:00~18:00と言ったしても可能です。
                  <br />
                  複数の時間帯を登録する場合、下に配置されたボタンより追加します。
                </Text>
                <PeriodMultiInputControlled name="spatiotemporal.periods" control={control} />
                <FormErrorMessage>
                  {errors.spatiotemporal?.periods &&
                    (errors.spatiotemporal.periods?.message as string)}
                </FormErrorMessage>

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
