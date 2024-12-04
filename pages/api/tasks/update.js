import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, completed } = req.body;

    try {
      await db.query('UPDATE tasks SET completed = ? WHERE id = ?', [
        completed,
        id,
      ]);
      res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  }
}
