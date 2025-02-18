export interface Task {
    id: number; // ID duy nhất của công việc
    text: string; // Nội dung của công việc
    category: string; // Phân loại công việc (ví dụ: work/personal/other)
    time: string; // Thời gian mà công việc sẽ thực hiện
    deactive: boolean; // Trạng thái hoạt động (true cho không hoạt động)
  }