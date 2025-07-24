import React, { useState } from 'react';
import styles from '../styles/HabitForm.module.css';

const HabitForm = ({ onSubmit, initialName = '', buttonText = 'Save' }) => {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter habit name"
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>{buttonText}</button>
    </form>
  );
};

export default HabitForm;