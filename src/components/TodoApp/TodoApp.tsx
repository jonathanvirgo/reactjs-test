import { useState } from "react";
import "./TodoApp.css";

export interface Task {
  id: number;
  text: string;
  category: string;
  time: string;
  deactive: boolean;
}

function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>("");
  const [taskCategory, setTaskCategory] = useState<string>("work");
  const [taskTime, setTaskTime] = useState<string>("");
  const [taskDeactive, setTaskDeactive] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addOrUpdateTask = () => {
    if (!taskText.trim()) return;

    if (editingTask) {
      // Cập nhật công việc
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              text: taskText,
              category: taskCategory,
              time: taskTime,
              deactive: taskDeactive,
            }
          : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      // Thêm công việc mới
      const newTask: Task = {
        id: Date.now(),
        text: taskText,
        category: taskCategory,
        time: taskTime,
        deactive: taskDeactive,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    resetInputs();
  };

  const resetInputs = () => {
    setTaskText("");
    setTaskCategory("work");
    setTaskTime("");
    setTaskDeactive(false);
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setTaskText(task.text);
    setTaskCategory(task.category);
    setTaskTime(task.time);
    setTaskDeactive(task.deactive);
    setEditingTask(task);
  };

  const handleDeleteTask = (id: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  return (
    <div className="todo-container">
      <h2>📝 To-Do List</h2>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Nhập công việc..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <select
          value={taskCategory}
          onChange={(e) => setTaskCategory(e.target.value)}
        >
          <option value="work">Công việc</option>
          <option value="personal">Cá nhân</option>
          <option value="other">Khác</option>
        </select>
        <input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
        <div>
          <label style={{ color: "#000" }}>
            <input
              type="radio"
              value="active"
              checked={!taskDeactive}
              onChange={() => setTaskDeactive(false)}
            />
            Hoạt động
          </label>
          <label style={{ color: "#000" }}>
            <input
              type="radio"
              value="inactive"
              checked={taskDeactive}
              onChange={() => setTaskDeactive(true)}
            />
            Không hoạt động
          </label>
        </div>
        <button onClick={addOrUpdateTask}>
          {editingTask ? "Lưu thay đổi" : "Thêm"}
        </button>
        {editingTask && <button onClick={resetInputs}>Hủy</button>}
      </div>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`todo-item ${task.deactive ? "inactive" : "active"}`}
          >
            <div>
              <strong>{task.text}</strong>
              <p>Phân loại: {task.category}</p>
              <p>Thời gian: {task.time}</p>
              <p>
                Trạng thái: {task.deactive ? "Không hoạt động" : "Hoạt động"}
              </p>
            </div>
            <div>
              <button onClick={() => handleEditTask(task)}>Sửa</button>
              <button onClick={() => handleDeleteTask(task.id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
