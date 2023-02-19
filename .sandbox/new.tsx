import React from "react";
import NextImage from "next/image";
import type { NextPage } from "next";
import {
  Text,
  Box,
  Heading,
  Stack,
  Grid,
  GridItem,
  Container,
  Flex,
} from "@chakra-ui/react";
import { PeriodOfTimeInput, SensorsInput, Map } from "../components";
import { SimpleDatePicker, CustomEditor } from "../common";
import { NewProjectValues } from "../types";
import { LavlusApi } from "../utils";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms";
// other
import dateFormat from "dateformat";
import { InputControl, SubmitButton, PercentComplete } from "formik-chakra-ui";
import { Formik } from "formik";
import * as yup from "yup";
import * as turf from "@turf/turf";
// image
import Cording from "../undraw/coding.svg";
import ProjectTeam from "../undraw/project_team.svg";
import Preferences from "../undraw/preferences.svg";
import Booked from "../undraw/booked.svg";
import Settings from "../undraw/settings.svg";
import MapImage from "../undraw/map_image.svg";

const defaultOverview = `
#### 以下はテンプレートです。
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

|センサ|使用目的|備考　|
|:---|:-----|:----|
|加速度センサ|運動量を測定するために使用します|特になし|
|ジャイロセンサ|運動量を測定の補助に使用します|特になし|
`;

// TODO: この画面から移動しますか？ってやつを導入する

const toMonth = new Date();
const nextMonth = new Date();
nextMonth.setMonth(new Date().getMonth() + 1);

const initialValues: NewProjectValues = {
  name: "",
  overview: defaultOverview,
  startDate: dateFormat(toMonth, "isoDateTime"),
  endDate: dateFormat(nextMonth, "isoDateTime"),
  image:
    "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg",
  sensorSetting: {
    isProvidedProfile: false,
    sensors: [],
  },
  spatiotemporalSetting: {
    location: {},
    area: {},
    periods: [
      {
        interval: {
          length: 1,
          entity: "week",
          dayOfWeek: ["mon", "wed", "fri"],
        },
        period: {
          from: "10:00:00",
          to: "12:00:00",
        },
      },
    ],
  },
};
const validationSchema = yup.object({
  name: yup.string().required(),
  overview: yup.string().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  image: yup.string().required(),
  sensorSetting: yup.object().required(),
  spatiotemporalSetting: yup.object().required(),
});

const New: NextPage = () => {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        console.log(JSON.stringify(values, null, 2));
        const data = await LavlusApi.createProject({
          values,
          token: auth.token,
        });
        if (data) router.replace(`/${auth.username}`);
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <Container as="main" maxW="1000px" p={8}>
          <Stack as="form" onSubmit={handleSubmit as any} spacing={24} mb={12}>
            <Grid templateColumns="1.25fr 1fr">
              <Stack spacing={4}>
                <Heading as="h1" size="xl" my="auto">
                  クラウドセンシングを
                  <br />
                  はじめましょう!
                </Heading>
                <Text fontSize="lg">
                  センシングプロジェクトの作成は10分ほどで完了します!
                  <br />
                  以下のフォーム入力を完了してください。
                </Text>
              </Stack>
              <NextImage src={Cording} />
            </Grid>

            <Stack spacing={6}>
              <CustomHeading
                heading="プロジェクト名"
                explanation="センシングプロジェクト名を4文字以上30文字以内で指定してください"
                image={ProjectTeam}
              />
              <InputControl
                name="name"
                inputProps={{
                  variant: "filled",
                  size: "lg",
                  placeholder: "プロジェクト名",
                }}
              />
            </Stack>

            <Stack spacing={6}>
              <CustomHeading
                heading="協力者への説明"
                explanation={
                  "センシングプロジェクトの意図を協力者に伝わるようにテンプレートに添って記述してください。\nMarkdown記法が使用できます。"
                }
                image={Preferences}
              />
              <CustomEditor
                defaultValue={values.overview}
                onChange={(value) => setFieldValue("overview", value)}
              />
            </Stack>

            <Stack spacing={6}>
              <CustomHeading
                heading="プロジェクトの有効期間"
                explanation={
                  "センシングプロジェクトの有効期間を指定してください。\nこの有効期間内に入ると自動的にセンシングプロジェクトが開始され、終了するとセンシングプロジェクトは終了となります。"
                }
                image={Booked}
              />
              <Flex
                justifyContent="space-around"
                p={12}
                border="solid #EDF2F7 6px"
                borderRadius={12}
              >
                <Box>
                  <Text fontWeight="bold" fontSize="xl" mb={4}>
                    開始日
                  </Text>
                  <SimpleDatePicker
                    value={new Date(values.startDate)}
                    onChange={(date) =>
                      setFieldValue(
                        "startDate",
                        dateFormat(date, "isoDateTime")
                      )
                    }
                  />
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="xl" mb={4}>
                    終了日
                  </Text>
                  <SimpleDatePicker
                    value={new Date(values.endDate)}
                    onChange={(date) =>
                      setFieldValue("endDate", dateFormat(date, "isoDateTime"))
                    }
                  />
                </Box>
              </Flex>
            </Stack>

            <Stack spacing={6}>
              <CustomHeading
                heading="センサ設定"
                explanation={
                  "使用するセンサとそのリフレッシュレートを入力してください。\nセンサを選択する際は、右上のスイッチを有効にした上でリフレッシュレートの数値を適切な値で入力してください。"
                }
                image={Settings}
              />
              <SensorsInput />
            </Stack>

            <Stack spacing={16}>
              <CustomHeading
                heading="時空間フェンシング"
                explanation={
                  "協力者にとっていつ・どこでセンシングが行われているのか分からないという状況は非常に不安です。\nLavlusは、時空間フェンシングによる時間帯とエリアの制限によってこの問題を緩和しています。"
                }
                image={MapImage}
              />
              <Stack spacing={6}>
                <Heading
                  as="h3"
                  size="lg"
                  borderLeft="36px solid #76E4F7"
                  pl={2}
                >
                  時間帯の設定
                </Heading>
                <Text fontSize="lg">
                  センシングプロジェクトが開始される時間帯を入力してください。
                  <br />
                  毎日の9:00~10:00に加えて、隔週の土曜日の16:00~18:00と言ったしても可能です。
                  <br />
                  複数の時間帯を登録する場合、下に配置されたボタンより追加します。
                </Text>
                <PeriodOfTimeInput />
              </Stack>

              <Stack spacing={6}>
                <Heading
                  as="h3"
                  size="lg"
                  borderLeft="36px solid #76E4F7"
                  pl={2}
                >
                  エリアの設定
                </Heading>
                <Text fontSize="lg">
                  センシングプロジェクト実施するエリアを指定します。
                  <br />
                  左のメニューアイコンより範囲を指定してください。また、エリアは囲まれている必要があります。
                </Text>
                <Box w="100%" h="600px">
                  <Map
                    onChange={(value: any) => {
                      setFieldValue(
                        "spatiotemporalSetting.location",
                        turf.center(value)
                      );
                      setFieldValue("spatiotemporalSetting.area", value);
                    }}
                  />
                </Box>
              </Stack>
            </Stack>
            <PercentComplete />
            <SubmitButton
              onClick={() => {
                console.log(values);
              }}
            >
              センシングプロジェクトを作成
            </SubmitButton>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

interface CustomHeadingProps {
  heading: string;
  explanation: string;
  image: any;
}

const CustomHeading: React.FC<CustomHeadingProps> = ({
  heading,
  explanation,
  image,
}) => {
  return (
    <Grid templateColumns="2fr 1fr" gap={6}>
      <Stack spacing={6}>
        <Heading as="h2" size="lg" borderLeft="12px solid #ED8936" pl={2}>
          {heading}
        </Heading>

        <Text fontSize="lg" m="auto" flex={1}>
          {explanation.split("\n").map((elm) => (
            <span key={elm} style={{ display: "block" }}>
              {elm} <br />
            </span>
          ))}
        </Text>
      </Stack>
      <GridItem>
        <Flex h="100%" alignItems="flex-end">
          <NextImage height="300px" src={image} />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default New;
