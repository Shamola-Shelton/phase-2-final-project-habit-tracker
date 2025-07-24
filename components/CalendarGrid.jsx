import React from 'react';
import { getLast7Days, isCompleted } from '../utils/dateHelpers';
import styles from '../styles/CalendarGrid.module.css';

const CalendarGrid = ({ completedDates }) => {
  const days = getLast7Days();

  return (
    <div className={styles.grid}>
      {days.map((day) => (
        <div
          key={day}
          className={`${styles.day} ${isCompleted(completedDates, day) ? styles.completed : ''}`}
        >
          {new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;