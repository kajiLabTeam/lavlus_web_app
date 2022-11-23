import React from "react";
import { chakra } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ChakraDatePicker = chakra(DatePicker, {
  baseStyle: {
    bg: "gray.100",
    p: "14px",
    borderRadius: "30px",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export interface ChakraDatePickerProps {
  value?: Date;
  onChange?: (value: Date) => void;
}

export const SimpleDatePicker = ({
  value,
  onChange,
}: ChakraDatePickerProps) => {
  const [date, setDate] = React.useState(value ?? new Date());
  const handleChange = (date: Date) => {
    setDate(date);
    onChange && onChange(date);
  };
  return (
    <ChakraDatePicker
      selected={date}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
    />
  );
};
