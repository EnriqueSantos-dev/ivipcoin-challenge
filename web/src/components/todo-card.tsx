import { useEffect } from "react";

import { Box, Checkbox, Stack, Typography } from "@mui/material";

import { DeleteTodoAlert, EditTodoDialog } from "@/components";

import { useToasty, useToggleTodoMutation } from "@/hooks";

import { Todo } from "@/types";

type TodoCardProps = Todo;

export const TodoCard = ({
  id,
  title,
  description,
  completed,
}: TodoCardProps) => {
  const { toast } = useToasty();
  const mutationToggleTodo = useToggleTodoMutation();

  const onChangeChecked = () => mutationToggleTodo.mutate(id);

  useEffect(() => {
    if (mutationToggleTodo.isError) {
      toast.error("Não foi possível atualizar o status da tarefa.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationToggleTodo.isError]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        borderRadius: 2,
        border: "1px solid #ccc",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Stack
        direction="row"
        flexGrow={1}
        useFlexGap
        gap={1.5}
        alignItems="center"
      >
        <Checkbox checked={completed} onChange={onChangeChecked} />
        <Stack direction="column">
          <Typography variant="body1">{title}</Typography>
          <Typography
            variant="body2"
            maxWidth="100px"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {description}
          </Typography>
        </Stack>
      </Stack>
      <Stack useFlexGap direction="row" gap={1} justifyContent="end">
        <EditTodoDialog id={id} title={title} description={description} />
        <DeleteTodoAlert todoId={id} />
      </Stack>
    </Box>
  );
};
