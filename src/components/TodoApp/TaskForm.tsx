import { useState, useEffect } from "react";

interface TaskFormProps {
  addTask: (task: any) => void;
  editingTask: any;
  updateTask: (task: any) => void;
  setEditingTask: (task: any) => void;
}

function TodoApp({
  addTask,
  editingTask,
  updateTask,
  setEditingTask,
}: TaskFormProps) {
  const [text, setText] = useState<string>("");
  const [category, setCategory] = useState<string>("work");
  const [time, setTime] = useState<string>("");
  const [deactive, setDeactive] = useState<boolean>(false);

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
      setCategory(editingTask.category);
      setTime(editingTask.time);
      setDeactive(editingTask.deactive);
    }
  }, [editingTask]);

  const resetForm = () => {
    setText("");
    setCategory("work");
    setTime("");
    setDeactive(false);
    setEditingTask(null);
  };

  const handleSubmit = () => {
    if (text.trim() === "") return;

    const newTask = {
      id: editingTask ? editingTask.id : Date.now(),
      text,
      category,
      time,
      deactive,
    };

    if (editingTask) {
      updateTask(newTask);
    } else {
      addTask(newTask);
    }
    resetForm();
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Nhập công việc..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="work">Công việc</option>
        <option value="personal">Cá nhân</option>
        <option value="other">Khác</option>
      </select>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="true"
            checked={deactive === true}
            onChange={() => setDeactive(true)}
          />
          Không hoạt động
        </label>
        <label>
          <input
            type="radio"
            value="false"
            checked={deactive === false}
            onChange={() => setDeactive(false)}
          />
          Hoạt động
        </label>
      </div>
      <button onClick={handleSubmit}>
        {editingTask ? "Lưu thay đổi" : "Thêm"}
      </button>
      {editingTask && <button onClick={resetForm}>Hủy</button>}
    </div>
  );
}

export default TodoApp;
