import React from 'react';
import {
  Container,
  Box,
  Text,
  Stack,
  HStack,
  Image,
  AspectRatio,
  Heading,
  Avatar,
  Grid,
  GridItem,
  Link,
  Button,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { GeoJsonEditor } from '@/components';
// SWR
import { Project, User } from '@/types';
import useSWR from 'swr';
// Hooks
import { useRouter } from 'next/router';
// NextPage
import { NextPageWithLayoutAndPageExtraInfo } from '@/types';
import { StandardLayout } from '@/layouts';

const ProjectDashboard: NextPageWithLayoutAndPageExtraInfo = () => {
  const router = useRouter();
  const projectId = router.query.projectId;
  const username = router.query.username;
  const { data: project, error } = useSWR<Project>(`/projects/${projectId}`);
  const { data: owner } = useSWR<User>(`/users/requester/${project?.owner}`);
  // URLに指定されたユーザ名が異なる場合、replaceする
  if (owner && username !== owner.name) router.replace(`/${owner.name}/${projectId}`);

  return (
    <>
      {/* menu */}
      {project && owner && <ProjectDashboardMenu project={project} owner={owner} />}
      <Container minH="inherit" maxW="container.xl">
        <Grid templateColumns="1fr 220px" gap={4} p={4} py={8}>
          {/* main */}
          <GridItem>{project && <ProjectDashboardOverview project={project} />}</GridItem>
          {/* member list */}
          <GridItem>{owner && <ProjectDashboardMemberList owner={owner} />}</GridItem>
        </Grid>
      </Container>
    </>
  );
};

const ProjectDashboardMenu = ({ project, owner }: { project: Project; owner: User }) => {
  const router = useRouter();
  const [select, setSelect] = React.useState('home');
  return (
    <Box w="100%" h="120px" position="relative" bg="gray.200">
      <Box boxShadow="0px 0px 16px -4px #000">
        <HStack w="100%" h="80px" px={8} spacing={2}>
          <Avatar size="sm" src={owner.picture} />
          <Link fontSize="lg" color="blue.500" onClick={() => router.push(`/${owner.name}`)}>
            @{owner.name}
          </Link>
          <Text fontSize="lg">/</Text>
          <Text fontSize="lg" color="blue.500" fontWeight="bold">
            {project.name}
          </Text>
        </HStack>

        <HStack h="40px" px={8} bottom={0} align="flex-end" spacing={6}>
          <Link
            fontSize="lg"
            fontWeight="bold"
            p={2}
            borderBottom={select === 'home' ? '4px solid #ED8936' : '4px solid transparent'}
            onClick={() => {
              setSelect('home');
              router.push(`/${owner.name}/${project.id}`);
            }}
          >
            ホーム
          </Link>
          <Link
            fontSize="lg"
            fontWeight="bold"
            p={2}
            borderBottom={select === 'data' ? '4px solid #ED8936' : '4px solid transparent'}
            onClick={() => {
              setSelect('data');
              // router.push(`/${owner.name}/${project.id}/data`);
            }}
          >
            データ
          </Link>
        </HStack>
      </Box>
      <Image
        w="100%"
        h="100px"
        alt="project_image"
        objectFit="cover"
        src={project.image}
        position="absolute"
        zIndex={-1}
      />
    </Box>
  );
};

const ProjectDashboardOverview = ({ project }: { project: Project }) => {
  return (
    <Stack spacing={4}>
      <AspectRatio w="200px" ratio={16 / 9}>
        <Image
          src={project.image}
          alt="ProjectImage"
          borderRadius="xl"
          objectFit="cover"
          border="solid 4px white"
        />
      </AspectRatio>

      <Heading as="h1" size="xl">
        {project.name}
      </Heading>

      <ReactMarkdown components={ChakraUIRenderer()} remarkPlugins={[remarkGfm]} skipHtml>
        {project.overview}
      </ReactMarkdown>

      <Box w="100%" h="600px">
        <GeoJsonEditor />
      </Box>
    </Stack>
  );
};

const ProjectDashboardMemberList = ({ owner, members }: { owner: User; members?: User[] }) => {
  const router = useRouter();
  return (
    <Stack bg="gray.50" p={4} my={4} borderRadius={4} spacing={4} border="1px solid #EDF2F7">
      <Text fontSize="lg" fontWeight="bold" borderBottom="2px solid #4A5568">
        オーナー
      </Text>
      <HStack onClick={() => router.push(`/${owner.name}`)}>
        <Avatar size="sm" src={owner.picture} />
        <Stack spacing={0}>
          <Text fontSize="sm" fontWeight="bold">
            {owner.name}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {owner.requesterInfo?.realm}
          </Text>
        </Stack>
      </HStack>
      <Text fontSize="lg" fontWeight="bold" borderBottom="2px solid #4A5568">
        メンバー
      </Text>
      {members ? (
        <HStack>
          <Avatar size="sm" src={owner.picture} />
          <Stack spacing={0}>
            <Text fontSize="sm" fontWeight="bold">
              {owner.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {owner.requesterInfo?.realm}
            </Text>
          </Stack>
        </HStack>
      ) : (
        <Text fontSize="sm">メンバーはまだいません</Text>
      )}
      <Button size="xs" colorScheme="teal" borderRadius="24px">
        メンバーを追加する +
      </Button>
    </Stack>
  );
};

ProjectDashboard.getLayout = (page: React.ReactElement) => {
  return <StandardLayout>{page}</StandardLayout>;
};
ProjectDashboard.needsAuthentication = true;
export default ProjectDashboard;
