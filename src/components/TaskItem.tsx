import { Task } from "../types/task"; // Import interface Task

interface TaskItemProps {
  task: Task;
  removeTask: (id: number) => void;
  setEditingTask: (task: Task) => void;
}

function TaskItem({ task, removeTask, setEditingTask }: TaskItemProps) {
    return (
      <li className={`task-item ${task.deactive ? "inactive" : "active"}`}>
        <div>
          <strong>{task.text}</strong>
          <p>Phân loại: {task.category}</p>
          <p>Thời gian: {task.time}</p>
          <p>Trạng thái: {task.deactive ? "Không hoạt động" : "Hoạt động"}</p>
        </div>
        <button onClick={() => setEditingTask(task)}>Sửa</button>
        <button onClick={() => removeTask(task.id)}>Xóa</button>
      </li>
    );
  }

export default TaskItem;
