import React from 'react';
import {
  Container,
  Center,
  Stack,
  Button,
  Text,
  useDisclosure,
  Heading,
  HStack,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

import { NextPageWithLayoutAndPageExtraInfo } from '@/types';
import { StandardLayout } from '@/layouts';

import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { firebaseAuth } from '@/utils';
import { useRouter } from 'next/router';

const Login: NextPageWithLayoutAndPageExtraInfo = () => {
  const router = useRouter();

  const onSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);
      router.push(`/${result.user.displayName}`);
    } catch (err) {
      console.error(err);
    }
  };

  const onSignOut = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (err) {
      console.error(err);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container maxW="1000px">
        <Center h="100%" py={16}>
          <Stack gap={12} align="center">
            <Heading size="2xl">サインアップ 🚀</Heading>
            <Text maxW="500px">
              Lavlusの利用には、Googleアカウントでログインする必要があります。
              続行するには、Googleアカウントでログインしてください。
            </Text>

            <Button
              onClick={onSignIn}
              h={20}
              size="lg"
              variant="outline"
              borderColor="gray.600"
              borderRadius={16}
            >
              <HStack>
                <FcGoogle size="36px" />
                <Text fontSize="xl" letterSpacing={2}>
                  Googleアカウントでログインする
                </Text>
              </HStack>
            </Button>

            <HStack>
              <Button onClick={onOpen} size="sm">
                Show Auth
              </Button>
              <Button onClick={onSignOut} size="sm">
                Google SignOut
              </Button>
            </HStack>
          </Stack>
        </Center>
      </Container>
      {/* ---- ここからモーダル ---- */}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>OAuth Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as="pre" overflow="hidden">
              {JSON.stringify(firebaseAuth.currentUser, null, 2)}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

Login.getLayout = (page: React.ReactElement) => {
  return <StandardLayout>{page}</StandardLayout>;
};
export default Login;
