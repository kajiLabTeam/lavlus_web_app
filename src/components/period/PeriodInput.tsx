import React from 'react';
import { Input, Stack, VStack, Select, Flex, Text } from '@chakra-ui/react';
import { SimpleTimePicker, DayOfWeekInput } from '.';

import { Period } from '@/types';
import _ from 'lodash';

export interface PeriodInputProps {
  defaultValue?: Period;
  onChange?: (value: Period) => void;
}

export const PeriodInput = React.memo(
  ({
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

    const handleChange = (newValue: Partial<Period>) => {
      // @ts-ignore
      onChange && onChange({ ...value, ...newValue });
      setValue({ ...value, ...newValue });
    };

    return (
      <Stack bg="gray.100" borderRadius="20px" p="25px" alignItems="center" spacing={8}>
        <Flex w="200px" alignItems="flex-end">
          <Input
            size="lg"
            variant="flushed"
            type="number"
            value={value.interval > 0 ? value.interval : ''}
            onChange={(event) => handleChange({ interval: Number(event.target.value) })}
            textAlign="center"
          />
          <Select
            size="lg"
            variant="flushed"
            value={value.entity}
            onChange={(event) => {
              const entity = event.target.value;
              if (entity === 'week' || entity === 'day') handleChange({ entity });
            }}
          >
            <option value="day">日</option>
            <option value="week">週</option>
          </Select>
        </Flex>

        {value.entity === 'week' ? (
          <DayOfWeekInput
            defaultValue={value.dayOfWeek}
            onChange={(value) => {
              handleChange({ dayOfWeek: value });
            }}
          />
        ) : (
          <></>
        )}

        <Flex>
          <VStack>
            <Text>開始時間</Text>
            <SimpleTimePicker
              value={value.startTime}
              onChange={(value) => handleChange({ startTime: value })}
            />
          </VStack>
          <VStack>
            <Text>終了時間</Text>
            <SimpleTimePicker
              value={value.endTime}
              onChange={(value) => handleChange({ endTime: value })}
            />
          </VStack>
        </Flex>
      </Stack>
    );
  }
);

PeriodInput.displayName = 'PeriodInput';
