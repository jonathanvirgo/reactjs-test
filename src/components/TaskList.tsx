import TaskItem from "./TaskItem";
import { Task } from "../types/task"; // Import interface Task

interface TaskListProps {
  tasks: Task[];
  removeTask: (id: number) => void;
  setEditingTask: (task: Task) => void;
}

function TaskList({ tasks, removeTask, setEditingTask }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          removeTask={removeTask}
          setEditingTask={setEditingTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
