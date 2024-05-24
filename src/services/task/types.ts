export interface CreateTaskPayload {
  title: string;
  description: string;
  due: string;
  statusId: string;
  pictureUrl?: string | null;
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
