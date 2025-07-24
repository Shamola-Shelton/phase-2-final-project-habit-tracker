import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import HabitList from '../components/HabitList.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { fetchHabits, createHabit, updateHabit, deleteHabit } from '../utils/api';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHabits = async () => {
    try {
      setLoading(true);
      const data = await fetchHabits();
      const updatedHabits = await Promise.all(
        data.map(async (habit) => {
          try {
            const res = await fetch(`/api/progress?id=${habit.id}`);
            if (!res.ok) throw new Error('Failed to fetch progress');
            const { streak, totalCompletions, percentWeek } = await res.json();
            return { ...habit, streak, totalCompletions, percentWeek };
          } catch (err) {
            return habit; // Fallback to habit without progress
          }
        })
      );
      setHabits(updatedHabits);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleCreate = async (name) => {
    try {
      const newHabit = await createHabit(name);
      setHabits([...habits, { ...newHabit, streak: 0, totalCompletions: 0, percentWeek: 0 }]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, action, data) => {
    try {
      const updated = await updateHabit(id, action, data);
      const res = await fetch(`/api/progress?id=${id}`);
      if (!res.ok) throw new Error('Failed to fetch progress');
      const { streak, totalCompletions, percentWeek } = await res.json();
      setHabits(habits.map((h) => (h.id === id ? { ...updated, streak, totalCompletions, percentWeek } : h)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHabit(id);
      setHabits(habits.filter((h) => h.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMarkComplete = (id) => handleUpdate(id, 'markComplete', {});

  const handleReset = (id) => handleUpdate(id, 'reset', {});

  return (
    <div className={styles.container}>
      <NavBar />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <HabitList
          habits={habits}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onMarkComplete={handleMarkComplete}
          onReset={handleReset}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}