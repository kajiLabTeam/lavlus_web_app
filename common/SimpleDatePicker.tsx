import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const SimpleDatePicker = () => {
  const initialDate = new Date();
  const [startDate, setStartDate] = React.useState(initialDate);
  const handleChange = (date: Date) => {
    setStartDate(date);
  };

  return <DatePicker selected={startDate} onChange={handleChange} />;
};
