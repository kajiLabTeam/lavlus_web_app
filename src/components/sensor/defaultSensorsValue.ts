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

const sensorTypes = [
  'accelerometer', // 加速度
  'liner_accelerometer', // 線形加速度
  'gravity', // 重力
  'gyroscope', // ジャイロ
  'magnetic_field', // 地磁気
  'proximity', // 距離
  'ambient_temperature', // 周囲の気温
  'relative_humidity', // 相対湿度
  'temperature', // 端末温度
  'light', // 照度
  'pressure', // 気圧
  'gps', // GPS
  'noise_level', // ノイズレベル
  'wifi', // Wi-Fi
  'ble', // Bluetooth
];

export const defaultSensorsValue: Required<Omit<SensorInputProps, 'onChange'>>[] = [
  {
    value: { type: 'accelerometer', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '加速度',
    icon: BsSpeedometer2,
  },
  {
    value: { type: 'liner_accelerometer', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '線形加速度',
    icon: BsSpeedometer2,
  },
  {
    value: { type: 'gravity', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '重力',
    icon: BsSpeedometer2,
  },
  {
    value: { type: 'gyroscope', refreshRate: 0 },
    presets: [50, 100, 200],
    label: 'ジャイロ',
    icon: GiSpinningTop,
  },
  {
    value: { type: 'magnetic_field', refreshRate: 0 },
    presets: [0.5, 1, 5],
    label: '地磁気',
    icon: IoMagnetSharp,
  },
  {
    value: { type: 'proximity', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '距離',
    icon: MdVibration,
  },
  {
    value: { type: 'ambient_temperature', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '周囲の気温',
    icon: GiSpinningTop,
  },
  {
    value: { type: 'relative_humidity', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '相対湿度',
    icon: GiSpinningTop,
  },
  {
    value: { type: 'temperature', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '端末温度',
    icon: GiSpinningTop,
  },
  {
    value: { type: 'light', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '照度',
    icon: BsLightbulbFill,
  },
  {
    value: { type: 'pressure', refreshRate: 0 },
    presets: [50, 100, 200],
    label: '気圧',
    icon: MdCloud,
  },
  {
    value: { type: 'gps', refreshRate: 0 },
    presets: [0.1, 0.2, 1],
    label: 'GPS',
    icon: MdGpsFixed,
  },
  {
    value: { type: 'noise_level', refreshRate: 0 },
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
