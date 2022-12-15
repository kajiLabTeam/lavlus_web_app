import React from 'react';
import { IconButton, Grid } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { RiDeleteBin6Fill } from 'react-icons/ri';
// import { Badge } from '../../common';
import { PeriodInput } from '.';
// import { FieldArray, useFormikContext } from 'formik';
// import { NewProjectValues, PeriodOfTime } from '../../types';

import { Control, ArrayPath, FieldPath, FieldValues, useFieldArray } from 'react-hook-form';
import _ from 'lodash';

export interface PeriodMultiInputControlledProps<T extends FieldValues> {
  name: ArrayPath<T>;
  control: Control<T>;
}

export const PeriodMultiInputControlled = <T extends FieldValues>({
  name,
  control,
  ...props
}: PeriodMultiInputControlledProps<T>) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((field, index) => {
        <div>
          <PeriodInput onChange={field.onChange} />
          <button onClick={() => remove(index)} />
        </div>;
      })}
      <button onClick={() => append(fields[0])}>+</button>
    </>
  );
};

// export const PeriodMultiInputControlled = () => {
//   const { values, setFieldValue } = useFormikContext<NewProjectValues>();

//   const {
//     spatiotemporalSetting: { periods },
//   } = values;

//   const formValues = periods.map((item) => ({ ...item, key: Math.random() }));

//   // 変更
//   const handleChange = (value: PeriodOfTime, index: number) => {
//     formValues[index] = { ...value, key: formValues[index].key };
//     setFieldValue(
//       `spatiotemporalSetting.periods`,
//       formValues.map((item) => _.omit(item, ['key']))
//     );
//   };

//   // 削除
//   const handleDeleteChange = (key: number) => {
//     const deletedData = formValues.filter((item) => item.key !== key);
//     setFieldValue(
//       `spatiotemporalSetting.periods`,
//       deletedData.map((item) => _.omit(item, ['key']))
//     );
//   };

//   return (
//     <FieldArray
//       name="spatiotemporalSetting.periods"
//       render={(arrayHelpers) => (
//         <Grid gap={4}>
//           {formValues.map((period, index) => (
//             <Badge
//               key={period.key}
//               colorScheme="red"
//               bg="red.400"
//               icon={RiDeleteBin6Fill}
//               onClick={() => handleDeleteChange(period.key)}
//             >
//               <PeriodOfTimeSingleInput
//                 value={_.omit(period, ['key'])}
//                 onChange={(value) => handleChange(value, index)}
//               />
//             </Badge>
//           ))}
//           <IconButton
//             m="auto"
//             size="md"
//             colorScheme="blue"
//             icon={<AddIcon />}
//             aria-label="Add"
//             onClick={() => arrayHelpers.push({ ...defaultValue })}
//           />
//         </Grid>
//       )}
//     />
//   );
// };
