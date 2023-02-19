import React from 'react';
import { Text, Avatar, Stack, Grid, GridItem, Link } from '@chakra-ui/react';
import { User } from '@/types';

export const RequesterInfoView = ({ user }: { user: User }) => {
  return (
    <Stack w="100%" bg="gray.50" p={8} borderRadius={16} spacing={8}>
      {/* アイコンと名前の部分 */}
      <Grid templateRows="auto  1fr" templateColumns="auto 1fr" gap="0px 16px">
        <GridItem rowSpan={2}>
          <Avatar size="lg" src={user.picture} />
        </GridItem>
        <Text fontSize="3xl" fontWeight="bold">
          {user.name}
        </Text>
        <Text fontSize="lg" color="gray.500" mt="auto">
          {user.requesterInfo.realm}
        </Text>
      </Grid>
      {/* 自己紹介 */}
      <Stack spacing={4}>
        <Text fontSize="xl" fontWeight="bold" borderBottom="solid 1px">
          所属機関
        </Text>
        <Text as="pre" color="gray.600">
          {user.requesterInfo.organization}
        </Text>
      </Stack>
      {/* 自己紹介 */}
      <Stack spacing={4}>
        <Text fontSize="xl" fontWeight="bold" borderBottom="solid 1px">
          リンク
        </Text>
        <Stack>
          <Link href={user.requesterInfo.url} color="orange.400">
            {user.requesterInfo.url}
          </Link>
          <Link href={`mailto:${user.email}`} color="orange.400">
            {user.email}
          </Link>
        </Stack>
      </Stack>

      {/* 自己紹介 */}
      <Stack spacing={4}>
        <Text fontSize="xl" fontWeight="bold" borderBottom="solid 1px">
          自己紹介
        </Text>
        <Text as="pre" color="gray.600">
          {user.requesterInfo.introduction}
        </Text>
      </Stack>
    </Stack>
  );
};
