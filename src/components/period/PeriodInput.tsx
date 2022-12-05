import React from 'react';
import { Input, Stack, HStack, VStack, Select, Flex, Text } from '@chakra-ui/react';
import { SimpleTimePicker, DayOfWeekInput } from '.';

import { Period } from '@/types';
import _ from 'lodash';

export interface PeriodInputProps {
  defaultValue?: Period;
  onChange?: (value: Period) => void;
}

export const PeriodInput = ({
  defaultValue = {
    interval: 1,
    entity: 'week',
    dayOfWeek: ['mon', 'tue', 'wed'],
    startTime: '10:00:00',
    endTime: '14:00:00',
  },
  onChange,
}: PeriodInputProps) => {
  const [value, setValue] = React.useState<Period>(defaultValue);

  const handleChange = (field: keyof Period, newValue: number | string | string[]) => {
    // @ts-ignore
    value[field] = newValue;
    onChange && onChange(value);
    setValue(value);
  };

  return (
    <Stack bg="gray.100" borderRadius="20px" p="25px" alignItems="center" spacing={8}>
      <HStack w="200px">
        <Input
          size="lg"
          variant="flushed"
          type="number"
          value={value.interval}
          onChange={(event) => handleChange('interval', event.target.value)}
          textAlign="center"
        />
        <Select
          variant="flushed"
          value={value.entity}
          onChange={(event) => handleChange('entity', event.target.value)}
        >
          <option value="day">日</option>
          <option value="week">週</option>
        </Select>
      </HStack>

      {value.entity === 'week' ? (
        <DayOfWeekInput
          defaultValue={value.dayOfWeek}
          onChange={(value) => handleChange('dayOfWeek', value)}
        />
      ) : (
        <></>
      )}

      <Flex>
        <VStack>
          <Text>開始時間</Text>
          <SimpleTimePicker
            value={value.startTime}
            onChange={(value) => handleChange('startTime', value)}
          />
        </VStack>
        <VStack>
          <Text>終了時間</Text>
          <SimpleTimePicker
            value={value.endTime}
            onChange={(value) => handleChange('endTime', value)}
          />
        </VStack>
      </Flex>
    </Stack>
  );
};
