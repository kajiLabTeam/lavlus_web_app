import React from "react";
import {
  Text,
  Box,
  Switch,
  Input,
  Grid,
  GridItem,
  useBoolean,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

export interface SensorInputProps {
  name?: string;
  onChange?: (value: number) => void;
}

export const SensorInput = ({ name, onChange }: SensorInputProps) => {
  const [flag, setFlag] = useBoolean(false);
  const [value, setValue] = React.useState(-1);

  const inputHandleChange = (event: any) => {
    const value = event.target.value;
    if (flag) onChange && onChange(value);
    setValue(value);
  };

  const switchHandleChange = (event: any) => {
    if (flag) onChange && onChange(-1);
    else onChange && onChange(value);
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
        filter={flag ? "" : "contrast(50%)"}
      >
        <GridItem colSpan={2}>
          <Text fontSize="xl" fontWeight="bold">
            {name ?? "名もなきセンサ"}
          </Text>
        </GridItem>
        <GridItem display="flex" justifyContent="flex-end">
          <Switch isChecked={flag} onChange={switchHandleChange} />
        </GridItem>
        <GridItem rowSpan={2} display="flex" alignItems="flex-end">
          <RepeatIcon w="80px" h="80px" />
        </GridItem>
        <GridItem colSpan={2} display="flex" alignItems="flex-end">
          <Text>リフレッシュレート</Text>
        </GridItem>
        <GridItem colSpan={2} display="flex" alignItems="flex-end">
          <Input
            size="lg"
            variant="flushed"
            type="number"
            placeholder="120"
            textAlign="center"
            fontSize="2xl"
            disabled={!flag}
            onChange={inputHandleChange}
          />
          <Text fontSize="lg">Hz</Text>
        </GridItem>
      </Grid>
    </Box>
  );
};
