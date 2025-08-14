import React, { useEffect, useState } from 'react';
import './App.css';

// Initial tasks matching the Figma screen labels
const initialTasks = [
  { id: 1, text: 'Implement Figma design', completed: false },
  { id: 2, text: 'Fix UI bugs', completed: false },
  { id: 3, text: 'Test features', completed: false },
  { id: 4, text: 'Add SVG icons', completed: true }, // completed as shown by filled ellipse + check
];

function App() {
  const [theme, setTheme] = useState('dark'); // default to dark to match Figma
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = () => {
    const text = window.prompt('Add a new task');
    if (text && text.trim()) {
      setTasks((prev) => [
        ...prev,
        { id: Date.now(), text: text.trim(), completed: false },
      ]);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="App">
      <div className="todo-app">
        <header className="todo-header">
          <div className="header-content">
            <h1 className="todo-title">Tasks</h1>
            <p className="todo-subtitle">
              {completedCount} of {tasks.length} completed
            </p>
          </div>
        </header>

        <main className="todo-content">
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <button
                  className={`checkbox${task.completed ? ' checked' : ''}`}
                  onClick={() => toggleComplete(task.id)}
                  aria-pressed={task.completed}
                  aria-label={
                    task.completed
                      ? `Mark "${task.text}" as incomplete`
                      : `Mark "${task.text}" as complete`
                  }
                />
                <span className="task-text">{task.text}</span>
                <svg
                  className="chevron"
                  viewBox="0 0 12 12"
                  width="10.36"
                  height="10.36"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M4 1 L9 6 L4 11"
                    fill="none"
                    stroke="var(--muted)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            ))}
          </ul>

          <button
            className="fab"
            onClick={addTask}
            aria-label="Add a new task"
            title="Add task"
          />
        </main>
      </div>
    </div>
  );
}

export default App;
