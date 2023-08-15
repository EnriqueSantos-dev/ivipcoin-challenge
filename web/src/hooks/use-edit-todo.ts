import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editTodo } from "@/services/todos.service";

import { Todo } from "@/types";

export function useEditTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTodo,
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // Optimistically update to the new value
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((todo) => {
          if (todo.id === input.id) {
            return { ...todo, ...input };
          }
          return todo;
        })
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
