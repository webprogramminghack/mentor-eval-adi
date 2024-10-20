import styles from './Button.module.scss';
import React, { ReactNode, MouseEvent, FocusEvent, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { PuffLoader } from 'react-spinners';

type ButtonProps = {
  color?: 'primary' | 'secondary' | 'danger';
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  width?: 'full'|'default';
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const { color = 'primary',type='submit',width='default', isLoading, disabled, ...remainingProps } = props;

  return (
    <button
      type={type}
      className={clsx(styles.button, {
        [styles.primary]: color === 'primary',
        [styles.secondary]: color === 'secondary',
        [styles.danger]: color === 'danger',
        [styles.full]:width ==='full',
        [styles.isLoading]: isLoading,
      })}
      disabled={disabled || isLoading}
      {...remainingProps}
    >
      <span className='m-auto'>{props.children}</span>

      {props.isLoading && (
        <div className={styles.loader}>
          <PuffLoader color='#fff' size={20} />
        </div>
      )}
    </button>
  );
};
