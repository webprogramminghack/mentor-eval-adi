import styles from './Loading.module.scss';
import React from 'react';
import LoadingLogo from '../../assets/svg/icon-loading.png';

type LoadingProps = {
};

export const Loading: React.FC<LoadingProps> = () => {

  return (
        <img src={LoadingLogo} className={styles.spin} width={'25'} alt='loading'/>
  );
};
