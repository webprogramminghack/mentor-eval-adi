import styles from './Container.module.scss';
import React, { ReactNode, useCallback } from 'react';
import clsx from 'clsx';

type CardProps = {
  children?: ReactNode;
  className?: string;
  onLoadMore?: () => void;
};

export const Container: React.FC<CardProps> = (props) => {
  const { className,onLoadMore,...remainingProps} = props;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;


    if (scrollTop + clientHeight >= scrollHeight) {
      if (onLoadMore) {
        onLoadMore();
      }
    }
  }, [onLoadMore]);

  return (
    <div
    className={clsx(styles.card,className)}
    onScroll={handleScroll}
    {...remainingProps}
    >
      {props.children}
    </div>
  );
};
