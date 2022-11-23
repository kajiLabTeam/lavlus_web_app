import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  VStack,
  Avatar,
  Divider,
  Image,
  AspectRatio,
  BoxProps,
  ChakraComponent,
} from "@chakra-ui/react";
import { AiFillHome, AiFillDatabase, AiFillDashboard } from "react-icons/ai";
import { LavlusIcon } from "../../common/icons";
import { DrawerItem } from "./DrawerItem";

export const Drawer = ((props: BoxProps) => {
  const router = useRouter();
  const { username, projectId } = router.query;
  const projectPath = `/${username}/${projectId}`;

  const links = React.useMemo(
    () => [
      {
        label: "Home",
        href: `${projectPath}`,
        icon: AiFillHome,
      },
      {
        label: "Home3",
        href: `${projectPath}/sensors`,
        icon: AiFillDashboard,
      },
      {
        label: "Data",
        href: `${projectPath}/data`,
        icon: AiFillDatabase,
      },
    ],
    [projectPath]
  );

  return (
    <Box {...props}>
      <VStack spacing={6}>
        <Avatar size="lg" />
        <Text fontSize="xl" display={{ base: "none", xl: "block" }}>
          @miyagawa
        </Text>
        <Text
          fontSize="xs"
          color="gray.400"
          display={{ base: "none", xl: "block" }}
        >
          Miyagawa Nobuhito
        </Text>

        <Divider my={10} />

        {links.map((link) => (
          <DrawerItem
            key={link.href}
            href={link.href}
            icon={link.icon}
            selected={router.asPath === link.href}
          >
            {link.label}
          </DrawerItem>
        ))}

        <AspectRatio
          w={{ base: "48px", xl: "100%" }}
          ratio={{ base: 1 / 1, xl: 16 / 9 }}
        >
          <Image
            src="https://bit.ly/dan-abramov"
            alt="ProjectImage"
            borderRadius="xl"
            objectFit="cover"
          />
        </AspectRatio>

        <LavlusIcon boxSize="48px" />
        <Text
          fontSize="xl"
          fontWeight="bold"
          display={{ base: "none", xl: "block" }}
        >
          lavlus
        </Text>
        <Text
          fontSize="sm"
          color="gray.400"
          display={{ base: "none", xl: "block" }}
        >
          Powered by kaji-lab
        </Text>
      </VStack>
    </Box>
  );
}) as ChakraComponent<"div", {}>;
