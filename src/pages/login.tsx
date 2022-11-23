import React from "react";
import type { NextPage } from "next";
import {
  Container,
  Center,
  Stack,
  Button,
  Text,
  useDisclosure,
  Link,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { NextPageWithLayoutAndPageExtraInfo } from "@/types";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseAuth } from "@/utils";

const Login: NextPageWithLayoutAndPageExtraInfo = () => {
  const onSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);
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
      <Container w="100vw" h="100vh">
        <Center w="100%" h="100%">
          <Stack gap={8}>
            <Button onClick={onSignIn} colorScheme="green">
              Google SignIn
            </Button>
            <Button onClick={onOpen} colorScheme="orange">
              Show Auth
            </Button>
            <Button onClick={onSignOut} colorScheme="red">
              Google SignOut
            </Button>
          </Stack>
        </Center>
      </Container>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="full"
      >
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

export default Login;
