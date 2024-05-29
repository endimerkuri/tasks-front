export interface CreateTaskPayload {
  title: string;
  description: string;
  due: Date | null;
  statusId: string;
  pictureUrl?: string | null;
  label?: string | null;
  labelColor?: string | null;
}

export interface Status {
  _id: string;
  description: string;
}

export interface Task {
  _id: string;
  label: string;
  labelColor: string;
  title: string;
  description: string;
  due: Date;
  pictureUrl?: string | null;
  status: string;
}

export interface TaskStatus {
  _id: string;
  description: string;
  tasks: Task[];
}
