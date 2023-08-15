import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTodo } from "@/services/todos.service";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
