import React from 'react';
import { chakra } from '@chakra-ui/react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

const ChakraDatePicker = chakra(DatePicker, {
  baseStyle: {
    w: '100%',
    bg: 'gray.100',
    p: '14px',
    borderRadius: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const SimpleDatePicker = ({ dateFormat, ...props }: ReactDatePickerProps) => {
  return <ChakraDatePicker dateFormat={dateFormat ?? 'yyyy-MM-dd'} {...props} />;
};

export interface SimpleDatePickerControlledProps<T extends FieldValues>
  extends Omit<ReactDatePickerProps, 'onChange' | 'selected'> {
  name: FieldPath<T>;
  control: Control<T>;
}

export const SimpleDatePickerControlled = <T extends FieldValues>({
  name,
  control,
  ...props
}: SimpleDatePickerControlledProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <SimpleDatePicker
      {...props}
      selected={field.value}
      onChange={field.onChange}
      name={field.name}
      onBlur={field.onBlur}
    />
  );
};
