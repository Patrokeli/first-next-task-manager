import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      await db.query('DELETE FROM tasks WHERE id = ?', [id]);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  }
}
