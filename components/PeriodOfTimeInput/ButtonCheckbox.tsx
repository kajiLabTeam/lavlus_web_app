import React from "react";
import { Button } from "@chakra-ui/react";

interface ButtonCheckboxProps {
  label: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export const ButtonCheckbox = ({
  label,
  value,
  onChange,
}: ButtonCheckboxProps) => {
  const [checked, setChecked] = React.useState(value);
  const handleChange = () => {
    onChange && onChange(!checked);
    setChecked(!checked);
  };
  return (
    <Button
      w="50px"
      h="50px"
      colorScheme={checked ? "blue" : "blackAlpha"}
      borderRadius="50%"
      onClick={handleChange}
    >
      {label}
    </Button>
  );
};
