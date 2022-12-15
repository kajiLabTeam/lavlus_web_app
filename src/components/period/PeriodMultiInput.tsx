import React from 'react';
import { IconButton, Box, Stack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { PeriodInput } from '.';
import { Period } from '@/types';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

const defaultPeriod: Period = {
  interval: 1,
  entity: 'week',
  dayOfWeek: ['mon', 'tue', 'wed'],
  startTime: '10:00:00',
  endTime: '14:00:00',
};

export interface PeriodMultiInputProps {
  defaultValue?: Period[];
  onChange?: (periods: Period[]) => void;
}

export const PeriodMultiInput = ({
  defaultValue = [defaultPeriod],
  onChange,
}: PeriodMultiInputProps) => {
  const [value, setValue] = React.useState(defaultValue);
  const id = React.useId();

  const handleChange = (newValue: Period[]) => {
    onChange && onChange(newValue);
    setValue(newValue);
  };

  const handlePeriodInputChange = (period: Period, index: number) => {
    value[index] = period;
    handleChange([...value]);
  };

  // 削除
  const handleDelete = (index: number) => {
    handleChange(value.filter((period, i) => i !== index));
  };

  const handleAdd = () => {
    handleChange([...value, defaultPeriod]);
  };

  return (
    <Stack gap={4}>
      {value.map((period, index) => (
        <Box key={id + Math.random()} position="relative">
          <IconButton
            colorScheme="red"
            icon={<RiDeleteBin6Fill />}
            aria-label="delete"
            borderRadius="50%"
            position="absolute"
            top="-15px"
            right="-15px"
            onClick={() => handleDelete(index)}
          />
          <PeriodInput
            defaultValue={period}
            onChange={(newPeriod) => {
              handlePeriodInputChange(newPeriod, index);
            }}
          />
        </Box>
      ))}
      <IconButton
        w="100%"
        size="md"
        colorScheme="blue"
        icon={<AddIcon />}
        aria-label="Add"
        onClick={() => handleAdd()}
      />
    </Stack>
  );
};

export interface PeriodMultiInputControlledProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}

export const PeriodMultiInputControlled = <T extends FieldValues>({
  name,
  control,
}: PeriodMultiInputControlledProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  return <PeriodMultiInput defaultValue={field.value} onChange={field.onChange} />;
};
