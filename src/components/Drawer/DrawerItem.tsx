import React from "react";
import { useRouter } from "next/router";
import { Box, BoxProps, Icon, Text, ChakraComponent } from "@chakra-ui/react";

type DrawerItemComponent = ChakraComponent<"div", {}>;

interface DrawerItemProps extends BoxProps {
  selected: boolean;
  href: string;
  icon: React.ElementType<any>;
}

export const DrawerItem: React.FC<DrawerItemProps> = ((
  props: DrawerItemProps
) => {
  const router = useRouter();
  return (
    <Box
      as="button"
      w="100%"
      h={12}
      display="flex"
      justifyContent={{ base: "center", xl: "flex-start" }}
      alignItems="center"
      borderLeft={
        props.selected ? "5px solid #4FD1C5" : "5px solid rgba(255,255,255,0)"
      }
      color={props.selected ? "white" : "gray.400"}
      fontSize="lg"
      fontWeight={props.selected ? "bold" : "normal"}
      _hover={{
        bg: "rgba(255, 255, 255, 0.25)",
        borderLeft: "5px solid #4FD1C5",
      }}
      transition="background-color 0.5s"
      onClick={() => {
        router.replace(props.href);
      }}
    >
      <Icon as={props.icon} boxSize="1.5em" mx={4} />
      <Text display={{ base: "none", xl: "block" }}>{props.children}</Text>
    </Box>
  );
}) as DrawerItemComponent;
