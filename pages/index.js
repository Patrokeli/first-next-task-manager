import { useEffect, useState } from 'react';
import { FaCheck, FaUndo, FaTrash } from 'react-icons/fa'; // Import icons

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    await fetch('/api/tasks/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    setNewTask({ title: '', description: '' });
    fetchTasks();
  };

  const toggleCompletion = async (id, completed) => {
    await fetch('/api/tasks/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch('/api/tasks/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchTasks();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center mb-8">Task Manager</h1>

      <div className="flex flex-col items-center space-y-4 mb-8">
        <input
          type="text"
          placeholder="Task title"
          className="border border-gray-300 p-3 rounded-lg w-64 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border border-gray-300 p-3 rounded-lg w-64 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 border rounded-lg shadow-md transition-all duration-200 ${
              task.completed ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
            }`}
          >
            <h3 className="font-semibold text-xl">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleCompletion(task.id, !task.completed)}
                  className={`flex items-center px-4 py-2 rounded-lg text-white ${
                    task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {task.completed ? <FaUndo className="mr-2" /> : <FaCheck className="mr-2" />}
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
