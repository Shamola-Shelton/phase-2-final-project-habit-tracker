import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'habits.json');

  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    let habits = JSON.parse(fileData);

    if (req.method === 'GET') {
      const { userId } = req.query;
      const userHabits = habits.filter((habit) => habit.userId === userId);
      res.status(200).json(userHabits);
    } else if (req.method === 'POST') {
      const { name, userId } = req.body;
      const newHabit = {
        id: uuidv4(),
        name,
        userId,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      habits.push(newHabit);
      await fs.writeFile(filePath, JSON.stringify(habits, null, 2));
      res.status(201).json(newHabit);
    } else if (req.method === 'PUT') {
      const { id, action, data } = req.body;
      const habitIndex = habits.findIndex((h) => h.id === id);
      if (habitIndex === -1) {
        return res.status(404).json({ message: 'Habit not found' });
      }
      if (action === 'markComplete') {
        const today = new Date().toISOString().split('T')[0];
        if (!habits[habitIndex].completedDates.includes(today)) {
          habits[habitIndex].completedDates.push(today);
        }
      } else if (action === 'updateName') {
        habits[habitIndex].name = data.name;
      } else if (action === 'reset') {
        habits[habitIndex].completedDates = [];
      }
      await fs.writeFile(filePath, JSON.stringify(habits, null, 2));
      res.status(200).json(habits[habitIndex]);
    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      habits = habits.filter((h) => h.id !== id);
      await fs.writeFile(filePath, JSON.stringify(habits, null, 2));
      res.status(200).json({ message: 'Habit deleted' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}