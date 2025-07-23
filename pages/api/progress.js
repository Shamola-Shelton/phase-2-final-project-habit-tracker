const fs = require('fs/promises');
const path = require('path');
const { calculatePercentWeek } = require('../../utils/dateHelpers.js');

const dataPath = path.join(process.cwd(), 'data/habits.json');

async function getHabits() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'ID required' });
      const habits = await getHabits();
      const habit = habits.find((h) => h.id === id);
      if (!habit) return res.status(404).json({ error: 'Habit not found' });
      const percentWeek = calculatePercentWeek(habit.completedDates);
      res.status(200).json({
        streak: habit.streak,
        totalCompletions: habit.totalCompletions,
        percentWeek,
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch progress' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}