import { Rings } from "react-loader-spinner";
import React from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  return (
    <div className={styles.loderWrapper}>
      <Rings color="green" height={90} width={90} />
    </div>
  );
}
