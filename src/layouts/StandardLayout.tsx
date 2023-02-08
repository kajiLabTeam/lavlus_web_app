import { Box, Center, Text, Input, Avatar, HStack, Link, Button } from '@chakra-ui/react';
import { LavlusIcon } from '@/components/icons';
import { auth } from '@/utils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { AiOutlineLogout, AiFillSetting, AiFillBell } from 'react-icons/ai';

export const StandardLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Header />
      <Box as="main" w="100%" minH="calc(100vh - 150px)">
        {children}
      </Box>
      <Footer />
    </>
  );
};

const Header = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  return (
    <HStack
      w="100%"
      h="60px"
      p={4}
      position="sticky"
      zIndex={9999}
      bg="white"
      boxShadow="0px 0px 12px -4px #777777"
      spacing={4}
    >
      <Button colorScheme="whiteAlpha" onClick={() => router.push('/')} p={0}>
        <HStack>
          <LavlusIcon w="32px" h="32px" />
          <Text fontSize="xl" fontWeight="bold" color="black">
            Lavlus
          </Text>
        </HStack>
      </Button>

      {user ? (
        <>
          <Input
            width={300}
            size="sm"
            placeholder="依頼者 / プロジェクトを探す"
            borderRadius="full"
          />
          <Box flex={1} />
          <AiFillBell size={24} />
          <AiFillSetting size={24} />
          <AiOutlineLogout size={24} />
          <Avatar
            size="sm"
            name={user.displayName ?? ''}
            src={user.photoURL ?? ''}
            onClick={() => router.push(`/${user.displayName}`)}
          />
        </>
      ) : (
        <>
          <Box flex={1} />
          <Button colorScheme="orange" onClick={() => router.push('/login')}>
            ログイン
          </Button>
        </>
      )}
    </HStack>
  );
};

const Footer = () => {
  return (
    <HStack
      w="100%"
      h="90px"
      position="sticky"
      zIndex={9999}
      bg="#F0F0F0"
      justify="flex-end"
      px={4}
      spacing={4}
    >
      <Center h="100%">
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="gray.600">
            Powered By Kaji Lab.
          </Text>
          <Link href="https://kajilab.net" fontSize="lg" color="blue.400">
            https://kajilab.net
          </Link>
        </Box>
      </Center>
      <Center height="100%">
        <Avatar w={16} h={16} src="https://kajilab.net/hpg/img/main/logo.jpg" />
      </Center>
    </HStack>
  );
};
