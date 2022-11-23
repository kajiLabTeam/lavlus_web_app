import React from "react";
import { Box, Icon, IconButton, useTheme, ButtonProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface BadgeProps extends ButtonProps {
  icon?: IconType;
}

export const Badge = ({ children, icon, size, ...props }: BadgeProps) => {
  const theme = useTheme();
  return (
    <Box position="relative">
      <IconButton
        position="absolute"
        top="-5"
        right="-5"
        size="md"
        borderRadius={999}
        icon={<Icon as={icon} />}
        aria-label="Badge"
        m="auto"
        {...props}
      />
      {children}
    </Box>
  );
};
