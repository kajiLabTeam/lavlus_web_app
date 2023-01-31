import React from 'react';
import { useRouter } from 'next/router';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import {
  Box,
  Text,
  Image,
  Button,
  Heading,
  Avatar,
  Stack,
  Flex,
  Grid,
  GridItem,
  Center,
  Divider,
  Container,
  Tag,
  HStack,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { User, Project } from '../../types';
import { useIdToken } from '@/hooks';
import { format } from 'date-fns';
import { NextPageWithLayoutAndPageExtraInfo } from '@/types';

const ProjectList: NextPageWithLayoutAndPageExtraInfo = () => {
  const router = useRouter();
  const { username } = router.query;
  const token = useIdToken();
  const { data: projects } = useSWR<Project[]>([`/users/name/${username}/projects`, token]);
  const { data: user } = useSWR<User>([`/me`, token]);

  return (
    <Container maxW="container.xl" pt="50px">
      <Grid templateRows="40px auto" templateColumns="320px 1fr" gap={12} px={12}>
        <GridItem colSpan={2}>
          <Heading borderLeft="solid orange 12px" pl="12px">
            {username}のProject一覧
          </Heading>
        </GridItem>

        <GridItem>
          <Center>{user && <OwnerInfo user={user} />}</Center>
        </GridItem>
        <Stack spacing={6}>
          <Flex justify="end">
            <Link href="/new">
              <Button w={100} colorScheme="teal">
                + New
              </Button>
            </Link>
          </Flex>

          <Divider />
          {/* <pre>{JSON.stringify(projects, null, 2)}</pre> */}
          {projects &&
            user &&
            projects.map((project) => (
              <ProjectCard project={project} user={user} key={project.id} />
            ))}
        </Stack>
      </Grid>
    </Container>
  );
};

const OwnerInfo = ({ user }: { user: User }) => {
  return (
    <Stack>
      <Avatar size="3xl" src={user.picture} />
      <Text fontSize="4xl" fontWeight="bold">
        @{user.name}
      </Text>
      {user.requesterInfo && (
        <>
          <Text fontSize="2xl">{user.requesterInfo.realm}</Text>
          <Text color="gray.500">{user.requesterInfo.introduction}</Text>
        </>
      )}
    </Stack>
  );
};

const ProjectCard = ({ project, user }: { project: Project; user: User }) => {
  const router = useRouter();
  return (
    <Grid
      h="200px"
      bg="gray.300"
      borderRadius="xl"
      // templateRows="40px auto"
      templateColumns="120px 1fr"
      p={4}
      gap={8}
      onClick={() => router.push(`${user.name}/${project.id}`)}
    >
      <GridItem overflow="hidden" borderRadius="lg">
        <Image
          width="100%"
          height="100%"
          objectFit="cover"
          src={project.image}
          alt="ProjectImage"
        />
      </GridItem>
      <GridItem>
        <Stack h="100%">
          <Text fontSize="2xl" fontWeight="bold">
            {project.name}
          </Text>
          <HStack>
            <Tag variant="solid" colorScheme="teal">
              開始日: {format(new Date(project.startDate), 'yyyy年mm月dd日')}
            </Tag>
            <Tag variant="solid" colorScheme="orange">
              終了日: {format(new Date(project.endDate), 'yyyy年mm月dd日')}
            </Tag>
          </HStack>
          <Box bg="gray.100" borderRadius="lg" flex={1} p={2} overflow="hidden">
            <Text>{project.overview?.slice(0, 100)}...</Text>
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  );
};

ProjectList.needsAuthentication = true;
export default ProjectList;
