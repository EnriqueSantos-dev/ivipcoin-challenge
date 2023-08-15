import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { useFilters, useFiltersActions } from "@/hooks/use-filters";

type PaginateControlsProps = {
  totalPages: number;
  allTodosCount: number;
};

const LIMIT_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] as const;

export function PaginateControls({
  totalPages,
  allTodosCount,
}: PaginateControlsProps) {
  const limit = useFilters((state) => state.limit);
  const page = useFilters((state) => state.page);
  const { setFilters } = useFiltersActions();

  const onChangePage = (page: number) => {
    setFilters({ page });
  };

  const onChangeLimit = (newLimit: number) => {
    if (newLimit === limit) return;

    const newTotalPages = Math.ceil(allTodosCount / newLimit);

    if (page > newTotalPages) {
      const isLastPage = page === newTotalPages;

      setFilters({
        page: isLastPage ? 1 : page - 1,
        limit,
      });
      return;
    }

    setFilters({ limit: newLimit });
  };

  return (
    <Stack
      useFlexGap
      gap={2}
      alignItems={{ xs: "start", sm: "center" }}
      justifyContent="center"
      direction={{ xs: "column", md: "row" }}
    >
      <Stack alignItems="center" direction="row" gap={2}>
        <Typography variant="body2">Tarefas por pág</Typography>
        <Select
          value={`${limit}`}
          sx={{ height: 32 }}
          onChange={(e) => onChangeLimit(Number(e.target.value))}
        >
          {LIMIT_OPTIONS.map((limit) => (
            <MenuItem key={limit} value={limit}>
              {limit}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Box sx={{ alignSelf: "center" }}>
        <Pagination
          count={totalPages}
          siblingCount={0}
          variant="outlined"
          shape="rounded"
          color="primary"
          showFirstButton
          showLastButton
          page={page}
          onChange={(_, page) => onChangePage(page)}
        />
      </Box>
    </Stack>
  );
}
