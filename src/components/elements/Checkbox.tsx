import { Root, Indicator } from '@radix-ui/react-checkbox';
import { Controller, TF } from 'react-hook-form';
import { Check } from 'lucide-react';

import styles from '../../assets/styles/checkbox.module.scss';

type CheckboxProps = {
  control: any,
  name: string
}

const Checkbox = ({ control, name }: CheckboxProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Root
          {...field}
          value={undefined}
          checked={field.value}
          onCheckedChange={field.onChange}
          className={styles.checkboxRoot}
        >
          <Indicator className={styles.checkboxIndicator}>
            <Check />
          </Indicator>
        </Root>
      )}
    /> 
  );
};

export default Checkbox;
