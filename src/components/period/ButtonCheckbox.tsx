import React from 'react';
import { Button, useBoolean } from '@chakra-ui/react';

interface ButtonCheckboxProps {
  value?: string;
  checked?: boolean;
  onChange?: (value: { value: string; checked: boolean }) => void;
  children?: React.ReactNode;
}

export const ButtonCheckbox = ({
  value = '',
  checked,
  onChange,
  children,
  ...props
}: ButtonCheckboxProps) => {
  const [flag, setFlag] = useBoolean(checked);
  const handleChange = () => {
    onChange && onChange({ value, checked: !flag });
    setFlag.toggle();
  };
  return (
    <>
      <input {...props} hidden></input>
      <Button
        w="50px"
        h="50px"
        colorScheme={flag ? 'blue' : 'blackAlpha'}
        borderRadius="50%"
        onClick={handleChange}
      >
        {children}
      </Button>
    </>
  );
};
