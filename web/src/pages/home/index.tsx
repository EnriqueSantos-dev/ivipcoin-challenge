import { Box, Container, Stack } from "@mui/material";

import {
  CreateNewTodoDialog,
  PaginateControls,
  SearchInput,
  TodosList,
} from "@/components";

import { useFilters, useGetPaginatedTodos } from "@/hooks";

export default function HomePage() {
  const page = useFilters((state) => state.page);
  const limit = useFilters((state) => state.limit);

  const {
    data: paginatedTodos,
    isLoading,
    isError,
  } = useGetPaginatedTodos({
    page: page,
    limit: limit,
  });

  return (
    <Box sx={{ paddingY: 5 }} flexGrow={1} overflow="auto">
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Stack direction="column" height="100%" useFlexGap gap={4}>
          <Stack
            useFlexGap
            gap={1.5}
            direction={{ xs: "column-reverse", md: "row" }}
            alignItems={{ xs: "end", md: "center" }}
            justifyContent="end"
          >
            {paginatedTodos && paginatedTodos.todos.length > 0 && (
              <SearchInput />
            )}
            <CreateNewTodoDialog />
          </Stack>
          <TodosList
            todos={paginatedTodos?.todos}
            isLoading={isLoading}
            isError={isError}
          />
          {paginatedTodos && paginatedTodos.todos.length > 0 && (
            <PaginateControls
              totalPages={paginatedTodos.paginationInfo.totalPages}
              allTodosCount={paginatedTodos.paginationInfo.allTodosCount}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
}
