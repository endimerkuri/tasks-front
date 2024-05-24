import { ApiResponse } from '@/utils/plugins/types/ApiResponse';
import { CreateTaskPayload, Task, TaskStatus } from './types';
import API from '@/utils/plugins/API';

const TaskService = {
  get(): Promise<
    ApiResponse<{
      groupedTasks: TaskStatus[];
    }>
  > {
    return API.get('/tasks');
  },

  create(payload: CreateTaskPayload): Promise<
    ApiResponse<{
      task: Task;
    }>
  > {
    return API.post('/tasks', payload);
  },

  edit(
    payload: Partial<CreateTaskPayload>,
    id: string,
  ): Promise<
    ApiResponse<{
      task: Task;
    }>
  > {
    return API.put(`/tasks/${id}`, payload);
  },

  delete(id: string): Promise<ApiResponse<{}>> {
    return API.delete(`/tasks/${id}`);
  },
};

export default TaskService;
