const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { calculateStreak } = require('../../utils/dateHelpers.js');


const dataPath = path.join(process.cwd(), 'data/habits.json');

async function getHabits() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(dataPath, '[]');
      return [];
    }
    throw err;
  }
}

async function saveHabits(habits) {
  await fs.writeFile(dataPath, JSON.stringify(habits, null, 2));
}

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const habits = await getHabits();
      res.status(200).json(habits);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch habits' });
    }
  } else if (method === 'POST') {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Name required' });
      const habits = await getHabits();
      const newHabit = {
        id: uuidv4(),
        name,
        completedDates: [],
        streak: 0,
        totalCompletions: 0,
      };
      habits.push(newHabit);
      await saveHabits(habits);
      res.status(201).json(newHabit);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create habit' });
    }
  } else if (method === 'PATCH') {
    try {
      const { id, action, name, date } = req.body;
      if (!id || !action) return res.status(400).json({ error: 'Invalid request' });
      const habits = await getHabits();
      const index = habits.findIndex((h) => h.id === id);
      if (index === -1) return res.status(404).json({ error: 'Habit not found' });
      let habit = habits[index];

      if (action === 'updateName') {
        if (!name) return res.status(400).json({ error: 'Name required' });
        habit.name = name;
      } else if (action === 'markComplete') {
        const completeDate = date || new Date().toISOString().split('T')[0];
        if (!habit.completedDates.includes(completeDate)) {
          habit.completedDates.push(completeDate);
          habit.completedDates.sort();
          habit.totalCompletions += 1;
          habit.streak = calculateStreak(habit.completedDates);
        }
      } else if (action === 'reset') {
        habit.completedDates = [];
        habit.streak = 0;
        habit.totalCompletions = 0;
      } else {
        return res.status(400).json({ error: 'Invalid action' });
      }

      await saveHabits(habits);
      res.status(200).json(habit);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update habit' });
    }
  } else if (method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'ID required' });
      const habits = await getHabits();
      const filtered = habits.filter((h) => h.id !== id);
      if (filtered.length === habits.length) return res.status(404).json({ error: 'Habit not found' });
      await saveHabits(filtered);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete habit' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}