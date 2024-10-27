import { useEffect, useState } from 'react';
import { useTitle } from '../../../hooks/js/useTitle';

const appTasks = [
  { id: 1, title: 'Task 1', isDone: false },
  { id: 2, title: 'Task 2', isDone: false },
  { id: 3, title: 'Task 3', isDone: false },
  { id: 4, title: 'Task 4', isDone: false },
  { id: 5, title: 'Task 5', isDone: false }
];

export const ToDoList = () => {
  const [tasks, setTasks] = useState(appTasks);
  const { changeTitle } = useTitle();

  useEffect(() => {
    const unfinishedTasks = tasks.filter((task) => !task.isDone).length;
    changeTitle(`${unfinishedTasks} pending tasks`);
  }, []);

  // Handle check/uncheck task
  const checkTask = (id, isDone) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isDone } : task
    );
    setTasks(updatedTasks);

    // Set the title depending on the number of tasks left
    const unfinishedTasks = updatedTasks.filter((task) => !task.isDone).length;
    const newTitle =
      unfinishedTasks !== 1
        ? `${unfinishedTasks} pending tasks`
        : `${unfinishedTasks} pending task`;
    changeTitle(newTitle);
  };

  return (
    <>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e) => checkTask(task.id, e.target.checked)}
            />
            {task.title}
          </li>
        ))}
      </ul>
    </>
  );
};
