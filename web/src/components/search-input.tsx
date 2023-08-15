import { ChangeEvent } from "react";

import { TextField } from "@mui/material";

import { useFilters, useFiltersActions } from "@/hooks/use-filters";

export function SearchInput() {
  const value = useFilters((state) => state.search);
  const { setFilters } = useFiltersActions();

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  return (
    <TextField
      type="search"
      placeholder="Procurar tarefa pelo título..."
      variant="outlined"
      size="small"
      fullWidth
      value={value || ""}
      onChange={onChangeValue}
    />
  );
}
