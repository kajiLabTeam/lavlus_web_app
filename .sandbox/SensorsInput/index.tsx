import React from "react";
import { Flex } from "@chakra-ui/react";
// GPS, proximity
import { MdGpsFixed, MdVibration } from "react-icons/md";
// light, noiseLevel, wifi, accelerometer
import {
  BsLightbulbFill,
  BsSoundwave,
  BsWifi,
  BsSpeedometer2,
} from "react-icons/bs";
// ble
import { FaBluetooth } from "react-icons/fa";
// gyroscope
import { GiSpinningTop } from "react-icons/gi";
// magnetometer
import { IoMagnetSharp } from "react-icons/io5";
import { NewProjectValues, Sensor } from "../../types";
import { SensorSingleInputProps, SensorSingleInput } from "./SensorSingleInput";
import { FieldArray, useFormikContext } from "formik";
import _ from "lodash";

const defaultSensors: SensorSingleInputProps[] = [
  {
    value: { type: "accelerometer", refreshRate: "" },
    presets: [50, 100, 200],
    label: "加速度センサ",
    icon: BsSpeedometer2,
  },
  {
    value: { type: "gyroscope", refreshRate: "" },
    presets: [50, 100, 200],
    label: "ジャイロセンサ",
    icon: GiSpinningTop,
  },
  {
    value: { type: "magnetometer", refreshRate: "" },
    presets: [0.5, 1, 5],
    label: "磁気センサ",
    icon: IoMagnetSharp,
  },
  {
    value: { type: "location", refreshRate: "" },
    presets: [0.1, 0.2, 1],
    label: "GPS",
    icon: MdGpsFixed,
  },
  {
    value: { type: "light", refreshRate: "" },
    presets: [50, 100, 200],
    label: "照度センサ",
    icon: BsLightbulbFill,
  },
  {
    value: { type: "proximity", refreshRate: "" },
    presets: [50, 100, 200],
    label: "接近センサ",
    icon: MdVibration,
  },
  {
    value: { type: "noiseLevel", refreshRate: "" },
    presets: [50, 100, 200],
    label: "ノイズレベル",
    icon: BsSoundwave,
  },
  {
    value: { type: "wifi", refreshRate: "" },
    presets: [0.1, 0.2, 1],
    label: "Wi-Fi",
    icon: BsWifi,
  },
  {
    value: { type: "ble", refreshRate: "" },
    presets: [0.1, 0.2, 1],
    label: "BLE",
    icon: FaBluetooth,
  },
];

// const defaultValues = [
//   { type: "accelerometer", refreshRate: "" },
//   { type: "gyroscope", refreshRate: "" },
//   { type: "magnetometer", refreshRate: "" },
//   { type: "location", refreshRate: "" },
//   { type: "light", refreshRate: "" },
//   { type: "proximity", refreshRate: "" },
//   { type: "noiseLevel", refreshRate: "" },
//   { type: "wifi", refreshRate: "" },
//   { type: "ble", refreshRate: "" },
// ];

export interface SensorsInputProps {
  value?: Sensor[];
  onChange?: (value: Sensor[]) => void;
}

export const SensorsInput = () => {
  const { values, setFieldValue } = useFormikContext<NewProjectValues>();
  const {
    sensorSetting: { sensors },
  } = values;

  // let initialValues: Sensor[] = [];
  // if (value) {
  //   initialValues = defaultValues.filter(
  //     (item) => !_.map(value, "type").includes(item.type)
  //   );
  //   initialValues.concat(value);
  // } else {
  //   initialValues = Object.assign(defaultValues);
  // }

  // const [formValues, setFormValues] = React.useState<Sensor[]>(initialValues);

  const handleChange = (sensor: Sensor) => {
    const newSensors = sensors.filter((item) => item.type !== sensor.type);
    sensor.refreshRate && newSensors.push(sensor);
    setFieldValue(`sensorSetting.sensors`, newSensors);
    // const newFormValues = formValues.filter(
    //   (item) => item.type !== sensor.type
    // );
    // newFormValues.push(sensor);
    // onChange && onChange(newFormValues.filter((item) => item.refreshRate > 0));
    // setFormValues(newFormValues);
  };

  return (
    <Flex flexWrap="wrap" justifyContent="center" gap={4}>
      {defaultSensors.map((sensor) => (
        <SensorSingleInput
          key={sensor.value.type}
          {...sensor}
          onChange={handleChange}
        />
      ))}
    </Flex>
  );
};
