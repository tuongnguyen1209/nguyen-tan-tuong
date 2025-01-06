import React from 'react';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

const Input: React.FC<Props> = (props) => {
  const { onChange, className, ...rest } = props;

  return (
    <>
      <input
        {...rest}
        type='text'
        className={`w-full outline-none pb-2 border-b-2 border-dashed ${className}`}
        onChange={(e) => onChange && onChange(e.target.value.toString())}
      />
    </>
  );
};

export default Input;
