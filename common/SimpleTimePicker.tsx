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

interface ChakraDatePickerProps {
  value?: Date;
  onChange?: (value: string) => void;
}

export const SimpleTimePicker = ({
  value,
  onChange,
}: ChakraDatePickerProps) => {
  const [date, setDate] = React.useState(value ?? new Date());
  const handleChange = (date: Date) => {
    setDate(date);
    onChange && onChange(dateFormat(date, "isoDateTime"));
  };
  return (
    <ChakraDatePicker
      selected={date}
      onChange={handleChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="h:mm aa"
      timeCaption="Time"
    />
  );
};
