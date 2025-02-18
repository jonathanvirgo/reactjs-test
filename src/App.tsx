import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm.js";
import TaskList from "./components/TaskList.js";

function App() {
  interface Task {
    id: number;
    text: string;
    category: string;
    time: string;
    deactive: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (taskId: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <div className="container">
      <h1>📝 To-Do List</h1>
      <TaskForm
        addTask={addTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        updateTask={updateTask}
      />
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        setEditingTask={setEditingTask}
      />
    </div>
  );
}

export default App;