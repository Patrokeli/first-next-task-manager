import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    try {
      await db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [
        title,
        description,
      ]);
      res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  }
}
