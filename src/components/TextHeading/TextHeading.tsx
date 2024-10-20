import React from 'react';
import styles from './TextHeading.module.scss';

type TextHeadingProps = {
title:string;
subtitle:string;
};

export const TextHeading: React.FC<TextHeadingProps> = ({title,subtitle }) => {

  return (
    <div className='text-center'>
        <div className={styles.primaryText} >{title}</div>
        <div>{subtitle}</div>
    </div>
  );
};
