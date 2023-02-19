import { GeoJsonEditor } from './GeoJsonEditor';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

export interface GeoJsonEditorControlledProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}

export const GeoJsonEditorControlled = <T extends FieldValues>({
  name,
  control,
  ...props
}: GeoJsonEditorControlledProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  return <GeoJsonEditor {...props} onChange={field.onChange} />;
};
