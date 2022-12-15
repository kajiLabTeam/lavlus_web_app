import React from 'react';
import { IconButton, Grid } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { RiDeleteBin6Fill } from 'react-icons/ri';
// import { Badge } from '../../common';
import { PeriodInput } from '.';
import { Period } from '@/types';
import _ from 'lodash';

const defaultValue: Period = {
  interval: {
    length: 1,
    entity: 'week',
    dayOfWeek: ['mon', 'wed', 'fri'],
  },
  period: {
    from: '10:00:00',
    to: '12:00:00',
  },
};

export const PeriodOfTimeInput = () => {
  const {
    spatiotemporalSetting: { periods },
  } = values;

  const formValues = periods.map((item) => ({ ...item, key: Math.random() }));

  // 変更
  const handleChange = (value: PeriodOfTime, index: number) => {
    formValues[index] = { ...value, key: formValues[index].key };
    setFieldValue(
      `spatiotemporalSetting.periods`,
      formValues.map((item) => _.omit(item, ['key']))
    );
  };

  // 削除
  const handleDeleteChange = (key: number) => {
    const deletedData = formValues.filter((item) => item.key !== key);
    setFieldValue(
      `spatiotemporalSetting.periods`,
      deletedData.map((item) => _.omit(item, ['key']))
    );
  };

  return (
    <Grid gap={4}>
      {formValues.map((period, index) => (
        <Badge
          key={period.key}
          colorScheme="red"
          bg="red.400"
          icon={RiDeleteBin6Fill}
          onClick={() => handleDeleteChange(period.key)}
        >
          <PeriodOfTimeSingleInput
            value={_.omit(period, ['key'])}
            onChange={(value) => handleChange(value, index)}
          />
        </Badge>
      ))}
      <IconButton
        m="auto"
        size="md"
        colorScheme="blue"
        icon={<AddIcon />}
        aria-label="Add"
        onClick={() => arrayHelpers.push({ ...defaultValue })}
      />
    </Grid>
  );
};
