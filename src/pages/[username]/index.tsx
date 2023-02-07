import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Text,
  Image,
  Button,
  Avatar,
  Stack,
  Grid,
  GridItem,
  Center,
  Input,
  Container,
  Tag,
  HStack,
  Link,
  Card,
} from '@chakra-ui/react';
import { LavlusIcon } from '@/components/icons';
import { BiHomeAlt, BiLibrary } from 'react-icons/bi';
// SWR
import { User, Project } from '@/types';
import useSWR from 'swr';
// Utils
import { format } from 'date-fns';
// NextPage
import { NextPageWithLayoutAndPageExtraInfo } from '@/types';

const ProjectList: NextPageWithLayoutAndPageExtraInfo = () => {
  const router = useRouter();
  const { username } = router.query;
  const { data: projects } = useSWR<Project[]>([`/users/name/${username}/projects`]);
  const { data: user } = useSWR<User>([`/me`]);

  return (
    <>
      {/* TODO: ここはレイアウトとして別に書く */}
      <HStack w="100vw" h="48px" bg="blue.900" position="sticky" px={4} spacing={8}>
        <HStack>
          <LavlusIcon w="36px" h="36px" />
          <Text fontSize="xl" fontWeight="bold" color="white">
            Lavlus
          </Text>
        </HStack>

        <Input
          width={300}
          size="sm"
          variant="outline"
          placeholder="他のプロジェクトを探す"
          borderRadius="full"
        />
        <Box flex={1} />
        <Avatar size="sm" src={user && user.picture} />
      </HStack>

      <Container maxW="container.xl" pt={16}>
        <Grid templateColumns="300px 1fr" gap={12} px={12}>
          <GridItem>
            <Center>{user && <RequesterInfoView user={user} />}</Center>
          </GridItem>

          <GridItem>
            <ProjectListMenu />
            <Stack mt={8} spacing={8}>
              {projects &&
                user &&
                projects.map((project) => (
                  <ProjectCard project={project} user={user} key={project.id} />
                ))}
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

const ProjectListMenu = () => {
  // own or other
  const [select, setSelect] = React.useState('own');
  const router = useRouter();
  return (
    <HStack h="44px" justify="space-between" borderBottom="solid 4px #4A5568">
      <HStack spacing={4}>
        <Button
          fontSize="xl"
          fontWeight="bold"
          variant="ghost"
          borderRadius={0}
          bottom={-1}
          borderBottom={select === 'own' ? 'solid 4px #ED8936' : 'solid 4px #4A5568'}
          onClick={() => setSelect('own')}
        >
          <BiHomeAlt />
          プロジェクト
        </Button>
        <Button
          fontSize="xl"
          fontWeight="bold"
          variant="ghost"
          borderRadius={0}
          bottom={-1}
          borderBottom={select === 'other' ? 'solid 4px #ED8936' : 'solid 4px #4A5568'}
          onClick={() => setSelect('other')}
        >
          <BiLibrary />
          参加プロジェクト
        </Button>
      </HStack>
      <Button w={120} size="sm" colorScheme="teal" onClick={() => router.push('/new')}>
        + New
      </Button>
    </HStack>
  );
};

const RequesterInfoView = ({ user }: { user: User }) => {
  return (
    <Stack width="360px" spacing={8}>
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

const ProjectCard = ({ project, user }: { project: Project; user: User }) => {
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
              {format(new Date(project.startDate), 'yyyy-mm-dd')}
            </Tag>
            <Tag variant="outline" colorScheme="orange">
              終了日:
              {format(new Date(project.endDate), 'yyyy-mm-dd')}
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

ProjectList.needsAuthentication = true;
export default ProjectList;
