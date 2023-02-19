import React from 'react';
import { Text, Heading, Stack, Grid, Image } from '@chakra-ui/react';

export const NewPageTitle = () => {
  return (
    <Grid templateColumns="1.25fr 1fr">
      <Stack spacing={4}>
        <Heading as="h1" size="xl" my="auto" display="flex" flexDirection="column">
          <span>クラウドセンシングを</span>
          <span>はじめましょう!</span>
        </Heading>
        <Text fontSize="lg" display="flex" flexDirection="column">
          <span>センシングプロジェクトの作成は10分ほどで完了します!</span>
          <span>以下のフォーム入力を完了してください。</span>
        </Text>
      </Stack>
      <Image src="/undraw/coding.svg" alt="coding" />
    </Grid>
  );
};
