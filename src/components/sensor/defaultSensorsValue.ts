// GPS, proximity
import { MdGpsFixed, MdVibration, MdCloud } from 'react-icons/md';
// light, noiseLevel, wifi, accelerometer
import { BsLightbulbFill, BsSoundwave, BsWifi, BsSpeedometer2 } from 'react-icons/bs';
// ble
import { FaBluetooth } from 'react-icons/fa';
// gyroscope
import { GiSpinningTop } from 'react-icons/gi';
// magnetometer
import { IoMagnetSharp } from 'react-icons/io5';

import { SensorInputProps } from '.';

export const defaultSensorsValue: Required<Omit<SensorInputProps, 'onChange'>>[] = [
  {
    value: { type: 'accelerometer', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '加速度センサ',
    icon: BsSpeedometer2,
  },
  {
    value: { type: 'gyroscope', refreshRate: 0 },
    presets: [50, 100, 200],
    label: 'ジャイロセンサ',
    icon: GiSpinningTop,
  },
  {
    value: { type: 'magnetometer', refreshRate: 0 },
    presets: [0.5, 1, 5],
    label: '磁気センサ',
    icon: IoMagnetSharp,
  },
  {
    value: { type: 'location', refreshRate: 0 },
    presets: [0.1, 0.2, 1],
    label: 'GPS',
    icon: MdGpsFixed,
  },
  {
    value: { type: 'light', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '照度センサ',
    icon: BsLightbulbFill,
  },
  {
    value: { type: 'proximity', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '接近センサ',
    icon: MdVibration,
  },
  {
    value: { type: 'pressure', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '気圧センサ',
    icon: MdCloud,
  },
  {
    value: { type: 'noiseLevel', refreshRate: 0 },
    presets: [50, 100, 200],
    label: 'ノイズレベル',
    icon: BsSoundwave,
  },
  {
    value: { type: 'wifi', refreshRate: 0 },
    presets: [0.1, 0.2, 1],
    label: 'Wi-Fi',
    icon: BsWifi,
  },
  {
    value: { type: 'ble', refreshRate: 0 },
    presets: [0.1, 0.2, 1],
    label: 'BLE',
    icon: FaBluetooth,
  },
];
