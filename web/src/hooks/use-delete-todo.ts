import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTodo } from "@/services/todos.service";

import { Todo } from "@/types";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // Optimistically update to the new value
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.filter((todo) => todo.id !== todoId)
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (_err, _input, context) => {
      // Rollback to the previous value
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
