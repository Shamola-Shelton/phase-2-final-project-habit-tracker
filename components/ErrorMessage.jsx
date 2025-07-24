import React from 'react';
import styles from '../styles/components.module.css';

const ErrorMessage = ({ message }) => (
  <p className={styles.error}>{message}</p>
);

export default ErrorMessage;