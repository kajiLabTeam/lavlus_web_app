import React from "react";
import { HStack } from "@chakra-ui/react";
import { ButtonCheckbox } from "./ButtonCheckbox";

const dayOfWeeks = [
  { value: "sun", label: "日" },
  { value: "mon", label: "月" },
  { value: "tue", label: "火" },
  { value: "wed", label: "水" },
  { value: "thu", label: "木" },
  { value: "fri", label: "金" },
  { value: "sat", label: "土" },
];

export interface DayOfWeekInputProps {
  value: string[];
  onChange?: (event: string[]) => void;
}

export const DayOfWeekInput = ({ value, onChange }: DayOfWeekInputProps) => {
  const [formValues, setFormValues] = React.useState<string[]>(value);
  const handleChange = (target: string, action: boolean) => {
    let newValues: string[] = [];
    if (action) {
      newValues = [...formValues, target];
    } else {
      newValues = formValues.splice(formValues.indexOf(target));
    }
    onChange && onChange(newValues);
    setFormValues(newValues);
  };
  return (
    <HStack spacing={4}>
      {dayOfWeeks.map((item) => (
        <ButtonCheckbox
          key={item.value}
          label={item.label}
          value={value.includes(item.value)}
          onChange={(action: any) => handleChange(item.value, action)}
        />
      ))}
    </HStack>
  );
};
