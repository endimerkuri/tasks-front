import { AxiosResponse } from 'axios';

export type ApiResponse<TData> = AxiosResponse<{
  message: string;
  data: TData;
  status: number;
}>;

export type MetaData = {
  current_page: number;
  from: number;
  last_page: number;
  links: { active: boolean; label: string; url: string }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type PaginatedResponse<TData> = AxiosResponse<{
  data: TData;
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
  meta: MetaData;
}>;

export type ApiError = {
  message: string;
  data: Record<string, string>;
  status: number;
};
