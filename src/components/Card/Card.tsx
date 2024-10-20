import styles from './Card.module.scss';
import React, { ReactNode } from 'react';
import clsx from 'clsx';

type CardProps = {
  children?: ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = (props) => {
  const { className,...remainingProps } = props;

  return (
    <div
    className={clsx(styles.card,className)}
    {...remainingProps}
    >
      {props.children}
    </div>
  );
};
