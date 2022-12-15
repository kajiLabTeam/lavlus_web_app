import React from 'react';
import {
  Text,
  Switch,
  Input,
  Grid,
  GridItem,
  useBoolean,
  Icon,
  Button,
  HStack,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BsSpeedometer2 } from 'react-icons/bs';
import { Sensor } from '@/types';

export interface SensorInputProps {
  value?: Sensor;
  presets?: number[];
  label?: string;
  icon?: IconType;
  onChange?: (value: Sensor) => void;
}

export const SensorInput = React.memo(
  ({
    value = { type: 'accelerometer', refreshRate: 0 },
    presets = [50, 100, 200],
    label = '加速度センサ',
    icon = BsSpeedometer2,
    onChange,
  }: SensorInputProps) => {
    const [enable, setEnable] = useBoolean(value.refreshRate > 0);
    const [refreshRate, setRefreshRate] = React.useState<number>(value.refreshRate);
    const id = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (refreshRate: number) => {
      onChange && onChange({ ...value, refreshRate });
      setRefreshRate(refreshRate);
    };

    const inputHandleChange = (event: any) => {
      const newRefreshRate: number = Number(event.target.value);
      handleChange(newRefreshRate);
    };

    const switchHandleChange = () => {
      if (enable) handleChange(0);
      setEnable.toggle();
    };

    React.useEffect(() => {
      inputRef.current && inputRef.current.focus();
    }, [enable]);

    return (
      <Grid
        bg="gray.100"
        w="320px"
        h="180px"
        borderRadius="20px"
        p="20px"
        templateColumns="auto 1fr 1fr"
        templateRows="1fr auto auto 1fr"
        templateAreas={`
        "name name switch"
        "icon label label"
        "icon presets presets"
        "icon input input"
      `}
        gap={2}
        filter={enable ? '' : 'contrast(90%)'}
        opacity={enable ? '' : '75%'}
      >
        <GridItem area="name">
          <Text fontSize="xl" fontWeight="bold">
            {label}
          </Text>
        </GridItem>
        <GridItem area="switch" display="flex" justifyContent="flex-end">
          <Switch isChecked={enable} onChange={switchHandleChange} />
        </GridItem>
        <GridItem area="icon" display="flex" alignItems="center">
          <Icon as={icon} w="80px" h="80px" mr={4} />
        </GridItem>
        <GridItem area="label">
          <Text>プリセット</Text>
        </GridItem>
        <GridItem area="presets">
          <HStack>
            {presets.map((preset) => (
              <Button
                key={id + preset}
                colorScheme="teal"
                variant="outline"
                size="xs"
                disabled={!enable}
                onClick={() => {
                  handleChange(preset);
                }}
              >
                {preset}Hz
              </Button>
            ))}
          </HStack>
        </GridItem>
        <GridItem colSpan={2} display="flex" alignItems="flex-end">
          <Input
            ref={inputRef}
            size="lg"
            variant="flushed"
            type="number"
            placeholder={String(presets[1])}
            _placeholder={{ color: 'gray.400' }}
            textAlign="center"
            fontSize="2xl"
            disabled={!enable}
            value={refreshRate > 0 ? refreshRate : ''}
            onChange={inputHandleChange}
          />
          <Text fontSize="lg">Hz</Text>
        </GridItem>
      </Grid>
    );
  }
);

SensorInput.displayName = 'SensorInput';
