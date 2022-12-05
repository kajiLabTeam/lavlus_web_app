import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Sensor } from '@/types';
import { SensorInput, defaultSensorsValue } from '.';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

export interface SensorMultiInputProps {
  // value?: Sensor[];
  onChange?: (value: Sensor[]) => void;
}

export const SensorMultiInput = ({ onChange }: SensorMultiInputProps) => {
  const [value, setValue] = React.useState<Sensor[]>([]);
  const id = React.useId();
  const handleChange = (newSensor: Sensor) => {
    // 更新があったType以外を取得
    let newValue = value.filter((sensor) => sensor.type !== newSensor.type);
    // 新しい値を追加
    newValue.push(newSensor);
    // refreshRateが0のセンサを除外
    newValue = newValue.filter((sensor) => sensor.refreshRate !== 0);
    onChange && onChange(newValue);
    setValue(newValue);
  };

  return (
    <Flex flexWrap="wrap" justifyContent="center" gap={4}>
      {defaultSensorsValue.map((sensor) => (
        <SensorInput key={id + sensor.value.type} onChange={handleChange} {...sensor} />
      ))}
    </Flex>
  );
};

export interface SensorMultiInputControlledProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}

export const SensorMultiInputControlled = <T extends FieldValues>({
  name,
  control,
}: SensorMultiInputControlledProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  return <SensorMultiInput onChange={field.onChange} />;
};
