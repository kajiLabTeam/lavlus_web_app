import React from "react";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

// other
// import dateFormat from "dateformat";

import { LavlusApi } from "@/utils";
// import { PeriodOfTimeInput, SensorsInput, Map } from "@/components";
import { SimpleDatePicker, CustomEditor } from "@/common";
import { NewPageTitle, FormSection } from "@/components/pages/new";

// GeoJSON
import * as turf from "@turf/turf";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { NextPageWithLayoutAndPageExtraInfo, NewProjectValues } from "@/types";

// const schema: yup.SchemaOf<NewProjectValues> = yup.object().shape({
//   name: yup.string().required("必須項目です"),
//   overview: yup.string().required("必須項目です"),
//   startDate: yup.string().required("必須項目です"),
//   endDate: yup.string().required("必須項目です"),
//   image: yup.string().required("必須項目です"),
//   sensorSetting: yup.object(),
//   spatiotemporalSetting: yup.object(),
// });

const New: NextPageWithLayoutAndPageExtraInfo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<NewProjectValues>({
    defaultValues: {
      name: "",
    },
    // resolver: yupResolver(schema),
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
            <Input
              id="name"
              placeholder="プロジェクト名"
              {...register("name")}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormSection>
          <FormSection
            name="overview"
            label="協力者への説明"
            explanation={
              "センシングプロジェクトの意図を協力者に伝わるようにテンプレートに添って記述してください。\nMarkdown記法が使用できます。"
            }
            image="/undraw/preferences.svg"
          >
            {/* <Input
              id="name"
              placeholder="プロジェクト名"
              {...register("name")}
            /> */}
            <FormErrorMessage>
              {errors.overview && errors.overview.message}
            </FormErrorMessage>
          </FormSection>
          <FormSection
            name="overview"
            label="プロジェクトの有効期間"
            explanation={
              "センシングプロジェクトの有効期間を指定してください。\nこの有効期間内に入ると自動的にセンシングプロジェクトが開始され、終了するとセンシングプロジェクトは終了となります。"
            }
            image="/undraw/booked.svg"
          >
            {/* <Input
              id="name"
              placeholder="プロジェクト名"
              {...register("name")}
            /> */}
            <FormErrorMessage>
              {errors.startDate && errors.startDate.message}
            </FormErrorMessage>
            <FormErrorMessage>
              {errors.endDate && errors.endDate.message}
            </FormErrorMessage>
          </FormSection>
          <FormSection
            name="sensors"
            label="センサ設定"
            explanation={
              "使用するセンサとそのリフレッシュレートを入力してください。\nセンサを選択する際は、右上のスイッチを有効にした上でリフレッシュレートの数値を適切な値で入力してください。"
            }
            image="/undraw/settings.svg"
          >
            {/* <Input
              id="name"
              placeholder="プロジェクト名"
              {...register("name")}
            /> */}
            <FormErrorMessage>
              {errors.sensorSetting && errors.sensorSetting.message}
            </FormErrorMessage>
          </FormSection>
          <FormSection
            name="overview"
            label="時空間フェンシング"
            explanation={
              "協力者にとっていつ・どこでセンシングが行われているのか分からないという状況は非常に不安です。\nLavlusは、時空間フェンシングによる時間帯とエリアの制限によってこの問題を緩和しています。"
            }
            image="/undraw/booked.svg"
          >
            {/* <Input
              id="name"
              placeholder="プロジェクト名"
              {...register("name")}
            /> */}
            <FormErrorMessage>
              {errors.spatiotemporalSetting &&
                errors.spatiotemporalSetting.message}
            </FormErrorMessage>
          </FormSection>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            プロジェクトを作成
          </Button>
        </Stack>
      </Container>
    </form>
  );
};

New.needsAuthentication = true;

export default New;
