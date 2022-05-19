import React from "react";
import { chakra } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
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
  onChange?: (value: string) => void;
}

export const SimpleDatePicker = ({ onChange }: ChakraDatePickerProps) => {
  const [date, setDate] = React.useState(new Date());
  const handleChange = (date: Date) => {
    setDate(date);
    onChange && onChange(dateFormat(date, "isoDateTime"));
  };
  return (
    <ChakraDatePicker
      selected={date}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
    />
  );
};
