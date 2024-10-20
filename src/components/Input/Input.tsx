import styles from './Input.module.scss';
import React, { ReactNode, KeyboardEvent, ChangeEvent } from 'react';
import clsx from 'clsx';

type InputProps = {
  children?: ReactNode;
  type?: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const Input: React.FC<InputProps> = (props) => {
  const { type='text',placeholder,required=true,value,disabled, ...remainingProps } = props;

  return (
    <input
    type={type}
    value={value}
    required={required}
    className={clsx(styles.input,{
        [styles.checkbox]: type === 'chekckbox',
      })}
    placeholder={placeholder}
    disabled={disabled}
    {...remainingProps}
    >
    </input>
  );
};
