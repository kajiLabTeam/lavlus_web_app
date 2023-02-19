import React from 'react';
import { useRouter } from 'next/router';
import { Stack, Grid, GridItem, Center, Container } from '@chakra-ui/react';
import { ProjectCard, ProjectListMenu, RequesterInfoView } from '@/components/pages/projectList';
// SWR
import { User, Project } from '@/types';
import useSWR from 'swr';
// NextPage
import { NextPageWithLayoutAndPageExtraInfo } from '@/types';
import { StandardLayout } from '@/layouts';

const ProjectList: NextPageWithLayoutAndPageExtraInfo = () => {
  const router = useRouter();
  const { username } = router.query;
  const { data: projects } = useSWR<Project[]>([`/users/name/${username}/projects`]);
  const { data: user } = useSWR<User>([`/users/requester/name/${username}`]);

  return (
    <Container minH="inherit" maxW="container.xl" pt={16}>
      <Grid templateColumns="360px 1fr" gap={8} px={4}>
        <GridItem>
          <Center>{user && <RequesterInfoView user={user} />}</Center>
        </GridItem>
        <GridItem>
          <ProjectListMenu />
          <Stack mt={8} spacing={8}>
            {projects &&
              user &&
              projects.map((project) => (
                <ProjectCard project={project} owner={user} key={project.id} />
              ))}
          </Stack>
        </GridItem>
      </Grid>
    </Container>
  );
};

ProjectList.getLayout = (page: React.ReactElement) => {
  return <StandardLayout>{page}</StandardLayout>;
};
ProjectList.needsAuthentication = true;
export default ProjectList;
