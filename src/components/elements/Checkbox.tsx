import React from 'react';

type CheckboxProps = React.PropsWithoutRef<JSX.IntrinsicElements['input']>

const Checkbox = ({ ...props }, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <label className="checkboxContainer">
      <input type="checkbox" {...props} ref={ref} />
      <span className="checkmark" />
    </label>
  );
};

export default React.forwardRef<HTMLInputElement, CheckboxProps>(Checkbox);
