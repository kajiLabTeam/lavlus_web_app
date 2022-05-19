import React from 'react';
import {
  Text,
  Box,
  Switch,
  Input,
  Grid,
  GridItem,
  useBoolean,
  HStack,
  Select,
  Button,
  ButtonProps,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

interface ButtonCheckboxProps extends ButtonProps {
  label: string;
}

export const ButtonCheckbox = ({ label }: ButtonCheckboxProps) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Button
      w="50px"
      h="50px"
      colorScheme={checked ? 'blue' : 'blackAlpha'}
      borderRadius="50%"
      onClick={() => setChecked(!checked)}
    >
      {label}
    </Button>
  );
};
