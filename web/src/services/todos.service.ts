import { api } from "@/lib/axios";
import { Todo } from "@/types";

type GetPaginatedTodosInput = {
  page?: number;
  limit?: number;
};

export type GetPaginatedTodosResponse = {
  todos: Todo[];
  paginationInfo: {
    totalPages: number;
    page: number;
    count: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
    allTodosCount: number;
  };
};

export async function getPaginatedTodos({
  page = 1,
  limit = 6,
}: GetPaginatedTodosInput) {
  const { data } = await api.get<GetPaginatedTodosResponse>("/todos", {
    params: { page, limit },
  });
  return data;
}

export type EditTodoInput = Pick<Todo, "id" | "title" | "description">;

export async function editTodo(input: EditTodoInput) {
  const { data } = await api.put<Todo>(`/todos/${input.id}`, input);
  return data;
}

export async function deleteTodo(id: string) {
  await api.delete(`/todos/${id}`);
}

export async function toggleTodo(id: string) {
  const { data } = await api.patch<Todo>(`/todos/${id}/toggle-completed`);
  return data;
}

type CreateTodoInput = Pick<Todo, "title" | "description" | "completed">;

export async function createTodo(input: CreateTodoInput) {
  const { data } = await api.post<Todo>("/todos", input);
  return data;
}
