import { useQuery } from "@tanstack/react-query";

import { getPaginatedTodos } from "@/services/todos.service";

export function useGetPaginatedTodos({
  page,
  limit,
}:
  | {
      page?: number;
      limit?: number;
    }
  | undefined = {}) {
  return useQuery({
    queryKey: ["todos", { page, limit }],
    queryFn: async () => getPaginatedTodos({ page, limit }),
  });
}
