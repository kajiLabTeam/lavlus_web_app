import React from "react";
import {
  Input,
  Stack,
  HStack,
  VStack,
  Select,
  Flex,
  Text,
} from "@chakra-ui/react";
import { SimpleTimePicker } from "../../common";
import { DayOfWeekInput } from "./DayOfWeekInput";
import { PeriodOfTime } from "../../types";
import _ from "lodash";

const defaultValue: PeriodOfTime = {
  interval: {
    length: 1,
    entity: "week",
    dayOfWeek: ["mon", "wed", "fri"],
  },
  period: {
    from: "10:00:00",
    to: "12:00:00",
  },
};

export interface PeriodOfTimeSingleInputProps {
  value?: PeriodOfTime;
  onChange?: (value: PeriodOfTime) => void;
}

export const PeriodOfTimeSingleInput = (
  props: PeriodOfTimeSingleInputProps
) => {
  const [formValues, setFormValues] = React.useState<PeriodOfTime>(
    props.value ?? defaultValue
  );

  const handleChange = (field1: string, field2: string, value: any) => {
    // 型安全
    if (field1 === "interval" || field1 === "period") {
      const newFormValues: PeriodOfTime = {
        ...formValues,
        [field1]: {
          ...formValues[field1],
          [field2]: value,
        },
      };

      if (field2 === "entity") {
        if (value === "day")
          newFormValues.interval = _.omit(newFormValues.interval, [
            "dayOfWeek",
          ]);
        else newFormValues.interval.dayOfWeek = ["mon", "wed", "fri"];
      }

      props.onChange && props.onChange(newFormValues);
      setFormValues(newFormValues);
    }
  };

  return (
    <Stack
      bg="gray.100"
      borderRadius="20px"
      p="25px"
      alignItems="center"
      spacing={8}
    >
      <HStack w="200px">
        <Input
          size="lg"
          variant="flushed"
          type="number"
          value={formValues.interval.length}
          onChange={(event: any) =>
            handleChange("interval", "length", event.target.value)
          }
          textAlign="center"
        />
        <Select
          variant="flushed"
          value={formValues.interval.entity}
          onChange={(event: any) =>
            handleChange("interval", "entity", event.target.value)
          }
        >
          <option value="day">日</option>
          <option value="week">週</option>
        </Select>
      </HStack>

      {formValues.interval.entity === "week" &&
        formValues.interval.dayOfWeek && (
          <DayOfWeekInput
            value={formValues.interval.dayOfWeek}
            onChange={(value: any) =>
              handleChange("interval", "dayOfWeek", value)
            }
          />
        )}

      <Flex>
        <VStack>
          <Text>開始時間</Text>
          <SimpleTimePicker
            value={new Date(`2022/${formValues.period.from}`)}
            onChange={(value: any) =>
              handleChange("period", "from", value.slice(11, 19))
            }
          />
        </VStack>
        <VStack>
          <Text>終了時間</Text>
          <SimpleTimePicker
            value={new Date(`2022/${formValues.period.to}`)}
            onChange={(value: any) =>
              handleChange("period", "to", value.slice(11, 19))
            }
          />
        </VStack>
      </Flex>
    </Stack>
  );
};
