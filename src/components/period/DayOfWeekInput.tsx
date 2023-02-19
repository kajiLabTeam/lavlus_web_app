import React from 'react';
import { HStack } from '@chakra-ui/react';
import { ButtonCheckbox } from '.';
import { DayOfWeek } from '@/types';

const dayOfWeeks: {
  value: DayOfWeek;
  children: string;
}[] = [
  { value: 'sun', children: '日' },
  { value: 'mon', children: '月' },
  { value: 'tue', children: '火' },
  { value: 'wed', children: '水' },
  { value: 'thu', children: '木' },
  { value: 'fri', children: '金' },
  { value: 'sat', children: '土' },
];

export interface DayOfWeekInputProps {
  defaultValue?: DayOfWeek[];
  onChange?: (event: DayOfWeek[]) => void;
}

export const DayOfWeekInput = ({ defaultValue, onChange }: DayOfWeekInputProps) => {
  const [value, setValue] = React.useState<DayOfWeek[]>(defaultValue ?? []);

  const handleChange = (newValue: DayOfWeek, checked: boolean) => {
    const newValues: DayOfWeek[] = checked
      ? [...value, newValue]
      : value.filter((item) => item !== newValue);
    onChange && onChange(newValues);
    setValue(newValues);
  };
  return (
    <HStack spacing={4}>
      {dayOfWeeks.map((item) => (
        <ButtonCheckbox
          key={item.value}
          checked={value.includes(item.value)}
          value={item.value}
          // TODO: ちゃんと型ガードしたほうがいい
          onChange={(event: any) => {
            handleChange(event.value, event.checked);
          }}
        >
          {item.children}
        </ButtonCheckbox>
      ))}
    </HStack>
  );
};
