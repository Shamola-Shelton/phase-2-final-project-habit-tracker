import React, { useContext } from 'react';
import HabitForm from './HabitForm.jsx';
import CalendarGrid from './CalendarGrid.jsx';
import ProgressBar from './ProgressBar.jsx';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/HabitList.module.css';

const HabitList = ({ habits, onCreate, onUpdate, onDelete, onMarkComplete, onReset, loading, error }) => {
  const { user } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <HabitForm onSubmit={(name) => onCreate(name, user?.id)} buttonText="Add Habit" />
      <ul className={styles.list}>
        {habits.map((habit) => (
          <li key={habit.id} className={styles.item}>
            <div className={styles.header}>
              <span>{habit.name}</span>
              <button onClick={() => onMarkComplete(habit.id)} className={styles.button}>Mark Today Complete</button>
              <HabitForm
                initialName={habit.name}
                onSubmit={(newName) => onUpdate(habit.id, 'updateName', { name: newName })}
                buttonText="Update Name"
              />
              <button onClick={() => onReset(habit.id)} className={styles.button}>Reset Progress</button>
              <button onClick={() => onDelete(habit.id)} className={styles.button}>Delete</button>
            </div>
            <CalendarGrid completedDates={habit.completedDates} />
            <ProgressBar streak={habit.streak} total={habit.totalCompletions} percent={habit.percentWeek} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;