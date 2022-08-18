import React from "react";
import { useRouter } from "next/router";
import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
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
} from "@chakra-ui/react";
import useSWR from "swr";
import { User, Project } from "../../types";

import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms";
import dateFormat from "dateformat";

const ProjectList: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const auth = useRecoilValue(authState);
  const { data: projects } = useSWR<Project[]>([
    `/users/${username}/projects`,
    auth.token,
  ]);

  return (
    <Container maxW="container.xl" pt="50px">
      <Grid
        templateRows="40px auto"
        templateColumns="320px 1fr"
        gap={12}
        px={12}
      >
        <GridItem colSpan={2}>
          <Heading borderLeft="solid orange 12px" pl="12px">
            {username}のProject一覧
          </Heading>
        </GridItem>

        <GridItem>
          <Center>
            <OwnerInfo />
          </Center>
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
          {projects &&
            projects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
        </Stack>
      </Grid>
    </Container>
  );
};

interface ProjectCardProps {
  project: Project;
}

const OwnerInfo = () => {
  return (
    <Stack>
      <Avatar
        size="3xl"
        src="https://avatars.githubusercontent.com/u/46354485?v=4"
      />
      <Text fontSize="4xl" fontWeight="bold">
        @miyagawa
      </Text>
      <Text fontSize="2xl">Miyagawa Nobuhito</Text>
      <Text color="gray.500">Programmer & Designer & Illustrator</Text>
    </Stack>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const auth = useRecoilValue(authState);
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
      onClick={() => router.push(`${auth.username}/${project.id}`)}
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
              開始日: {dateFormat(project.startDate, "yyyy年mm月dd日")}
            </Tag>
            <Tag variant="solid" colorScheme="orange">
              終了日: {dateFormat(project.endDate, "yyyy年mm月dd日")}
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

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    layout: "standard",
    authenticated: true,
  },
});

export default ProjectList;
