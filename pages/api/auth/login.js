import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(fileData);

    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}