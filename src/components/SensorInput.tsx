import React from 'react';
import { Flex } from '@chakra-ui/react';
// GPS, proximity
import { MdGpsFixed, MdVibration } from 'react-icons/md';
// light, noiseLevel, wifi, accelerometer
import { BsLightbulbFill, BsSoundwave, BsWifi, BsSpeedometer2 } from 'react-icons/bs';
// ble
import { FaBluetooth } from 'react-icons/fa';
// gyroscope
import { GiSpinningTop } from 'react-icons/gi';
// magnetometer
import { IoMagnetSharp } from 'react-icons/io5';
import { Sensor } from '@/types';
import _ from 'lodash';

import { Text, Box, Switch, Input, Grid, GridItem, useBoolean, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

const defaultSensors: SensorSingleInputProps[] = [
  {
    value: { type: 'accelerometer', refreshRate: '' },
    presets: [50, 100, 200],
    label: '加速度センサ',
    icon: BsSpeedometer2,
  },
  {
    value: { type: 'gyroscope', refreshRate: '' },
    presets: [50, 100, 200],
    label: 'ジャイロセンサ',
    icon: GiSpinningTop,
  },
  {
    value: { type: 'magnetometer', refreshRate: '' },
    presets: [0.5, 1, 5],
    label: '磁気センサ',
    icon: IoMagnetSharp,
  },
  {
    value: { type: 'location', refreshRate: '' },
    presets: [0.1, 0.2, 1],
    label: 'GPS',
    icon: MdGpsFixed,
  },
  {
    value: { type: 'light', refreshRate: '' },
    presets: [50, 100, 200],
    label: '照度センサ',
    icon: BsLightbulbFill,
  },
  {
    value: { type: 'proximity', refreshRate: '' },
    presets: [50, 100, 200],
    label: '接近センサ',
    icon: MdVibration,
  },
  {
    value: { type: 'noiseLevel', refreshRate: '' },
    presets: [50, 100, 200],
    label: 'ノイズレベル',
    icon: BsSoundwave,
  },
  {
    value: { type: 'wifi', refreshRate: '' },
    presets: [0.1, 0.2, 1],
    label: 'Wi-Fi',
    icon: BsWifi,
  },
  {
    value: { type: 'ble', refreshRate: '' },
    presets: [0.1, 0.2, 1],
    label: 'BLE',
    icon: FaBluetooth,
  },
];

export interface SensorSingleInputProps {
  value: Sensor;
  presets: number[];
  label?: string;
  icon?: IconType;
  onChange?: (value: Sensor) => void;
}

export const SensorSingleInput = ({
  value,
  presets,
  label,
  icon,
  onChange,
}: SensorSingleInputProps) => {
  const [flag, setFlag] = useBoolean(value.refreshRate > 0 ?? false);
  const [refreshRate, setRefreshRate] = React.useState<number | string>(value.refreshRate);

  const inputHandleChange = (event: any) => {
    const newRefreshRate: number = Number(event.target.value);
    if (flag) onChange && onChange({ ...value, refreshRate: newRefreshRate });
    setRefreshRate(newRefreshRate);
  };

  const switchHandleChange = () => {
    if (flag) {
      onChange && onChange({ ...value, refreshRate: 0 });
      setRefreshRate('');
    }
    setFlag.toggle();
  };

  return (
    <Box>
      <Grid
        bg="gray.100"
        w="300px"
        h="180px"
        borderRadius="20px"
        p="25px"
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={4}
        filter={flag ? '' : 'contrast(75%)'}
        opacity={flag ? '' : '75%'}
      >
        <GridItem colSpan={2}>
          <Text fontSize="xl" fontWeight="bold">
            {label ?? '名もなきセンサ'}
          </Text>
        </GridItem>
        <GridItem display="flex" justifyContent="flex-end">
          <Switch isChecked={flag} onChange={switchHandleChange} />
        </GridItem>
        <GridItem rowSpan={2} display="flex" alignItems="flex-end">
          <Icon as={icon ?? BsSpeedometer2} w="80px" h="80px" />
        </GridItem>
        <GridItem colSpan={2} display="flex" alignItems="flex-end">
          <Text>リフレッシュレート</Text>
        </GridItem>
        <GridItem colSpan={2} display="flex" alignItems="flex-end">
          <Input
            size="lg"
            variant="flushed"
            type="number"
            placeholder={`${presets[1]}` ?? '120'}
            textAlign="center"
            fontSize="2xl"
            disabled={!flag}
            value={refreshRate}
            onChange={inputHandleChange}
          />
          <Text fontSize="lg">Hz</Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export interface SensorsInputProps {
  value?: Sensor[];
  onChange?: (value: Sensor[]) => void;
}

export const SensorsInput = () => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" gap={4}>
      {defaultSensors.map((sensor) => (
        <SensorSingleInput key={sensor.value.type} {...sensor} />
      ))}
    </Flex>
  );
};
