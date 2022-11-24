import React from "react";
import { Text, Heading, Stack, Grid, Image } from "@chakra-ui/react";

export const NewPageTitle = () => {
  return (
    <Grid templateColumns="1.25fr 1fr">
      <Stack spacing={4}>
        <Heading as="h1" size="xl" my="auto">
          <Stack>
            <span>クラウドセンシングを</span>
            <span>はじめましょう!</span>
          </Stack>
        </Heading>
        <Text fontSize="lg">
          <Stack>
            <span>センシングプロジェクトの作成は10分ほどで完了します!</span>
            <span>以下のフォーム入力を完了してください。</span>
          </Stack>
        </Text>
      </Stack>
      <Image src="/undraw/coding.svg" />
    </Grid>
  );
};
