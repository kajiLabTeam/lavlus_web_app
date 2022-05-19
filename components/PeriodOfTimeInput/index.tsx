import React from 'react';
import {
  Text,
  Box,
  Switch,
  Input,
  Grid,
  GridItem,
  useBoolean,
  Stack,
  HStack,
  Select,
} from '@chakra-ui/react';
import { SimpleTimePicker } from '../../common';
import { ButtonCheckbox } from './ButtonCheckbox';

const entities = [
  { value: 'day', label: '日' },
  { value: 'week', label: '週間' },
];

const dayOfWeeks = [
  { value: 'sun', label: '日' },
  { value: 'mon', label: '月' },
  { value: 'tue', label: '火' },
  { value: 'wed', label: '水' },
  { value: 'thu', label: '木' },
  { value: 'fri', label: '金' },
  { value: 'sat', label: '土' },
];

export const PeriodOfTimeInput = () => {
  return (
    <>
      <Stack
        bg="gray.100"
        w="500px"
        borderRadius="20px"
        p="25px"
        alignItems="center"
        spacing={8}
      >
        <HStack w="200px">
          <Input
            size="lg"
            variant="flushed"
            type="number"
            value={1}
            textAlign="center"
          />
          <Select variant="flushed">
            <option value="option1">日</option>
            <option value="option2">週</option>
          </Select>
        </HStack>

        <HStack spacing={4}>
          {dayOfWeeks.map(item => (
            <ButtonCheckbox key={item.value} label={item.label} />
          ))}
        </HStack>

        <SimpleTimePicker />
      </Stack>
    </>
  );
};

const inputCore = () => {
  return (
    <Box bg="gray.100" w="600px" h="300px" borderRadius="20px" p="25px">
      <HStack>
        <Input size="lg" variant="flushed" type="number" />
        <Select variant="flushed">
          <option value="option1">日</option>
          <option value="option2">週</option>
        </Select>
      </HStack>
    </Box>
  );
};
