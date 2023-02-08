import React from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Image, Stack, Grid, Tag, HStack, Card } from '@chakra-ui/react';
// SWR
import { User, Project } from '@/types';
// Utils
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';

export const ProjectCard = ({ project, user }: { project: Project; user: User }) => {
  const router = useRouter();
  return (
    <Card boxShadow="0px 0px 12px -4px #777777" borderRadius={24}>
      <Grid templateColumns={'200px 1fr'}>
        <Image
          borderRadius="24px 0 0 24px"
          width="100%"
          height="100%"
          objectFit="cover"
          src={project.image}
          alt="ProjectImage"
        />

        <Stack h="100%" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            {project.name}
          </Text>

          <HStack>
            <Tag variant="outline" colorScheme="teal">
              開始日:
              {format(new Date(project.startDate), 'yyyy-MM-dd', { locale: ja })}
            </Tag>
            <Tag variant="outline" colorScheme="orange">
              終了日:
              {format(new Date(project.endDate), 'yyyy-MM-dd', { locale: ja })}
            </Tag>
          </HStack>
          <Box borderRadius="lg" px={2} m={0}>
            <Text>{project.overview?.slice(0, 100)}...</Text>
          </Box>
        </Stack>
      </Grid>
    </Card>
  );
};
