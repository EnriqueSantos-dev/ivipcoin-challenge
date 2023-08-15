import { useMemo } from "react";

import { Box, Stack, Typography } from "@mui/material";

import { TodoCard, TodoSkeleton } from "@/components";

import { useFilters } from "@/hooks/use-filters";

import { Todo } from "@/types";

type TodosListProps = {
  todos: Todo[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export function TodosList({ todos, isLoading }: TodosListProps) {
  const search = useFilters((state) => state.search);

  const filteredTodos = useMemo(
    () =>
      todos?.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase() ?? "")
      ),
    [todos, search]
  );

  return (
    <Stack spacing={2} flexGrow={1} overflow="auto" py={2}>
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <TodoSkeleton key={index} />
        ))}
      {filteredTodos?.map((todo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
      {!isLoading && filteredTodos?.length === 0 && (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          useFlexGap
          gap={3}
        >
          <Box sx={{ width: 250, height: 250 }}>
            <img src="/not-found.svg" alt="nada encontrado" />
          </Box>
          <Typography variant="body1" color="text.secondary">
            Nenhuma tarefa encontrada
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
