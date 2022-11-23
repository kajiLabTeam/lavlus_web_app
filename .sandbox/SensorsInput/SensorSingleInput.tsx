import React from "react";
import {
  Text,
  Box,
  Switch,
  Input,
  Grid,
  GridItem,
  useBoolean,
  Icon,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsSpeedometer2 } from "react-icons/bs";
import { Sensor } from "../../types";

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
  const [refreshRate, setRefreshRate] = React.useState<number | string>(
    value.refreshRate
  );

  const inputHandleChange = (event: any) => {
    const newRefreshRate: number = Number(event.target.value);
    if (flag) onChange && onChange({ ...value, refreshRate: newRefreshRate });
    setRefreshRate(newRefreshRate);
  };

  const switchHandleChange = () => {
    if (flag) {
      onChange && onChange({ ...value, refreshRate: 0 });
      setRefreshRate("");
    }
    setFlag.toggle();
  };

  return (
    <Box bg="gray.100" w="300px" h="180px" borderRadius="20px" p="25px">
      <Grid
        w="100%"
        h="100%"
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={4}
        filter={flag ? "" : "contrast(75%)"}
        opacity={flag ? "" : "75%"}
      >
        <GridItem colSpan={2}>
          <Text fontSize="xl" fontWeight="bold">
            {label ?? "名もなきセンサ"}
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
            placeholder={`${presets[1]}` ?? "120"}
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
