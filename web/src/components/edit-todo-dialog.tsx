import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

import { useEditTodoMutation, useToasty } from "@/hooks";

import { editOrCreateTodoSchema } from "@/shared/form-schemas/edit-or-create-todo";
import { Todo } from "@/types";

type FormValues = z.infer<typeof editOrCreateTodoSchema>;

type EditTodoDialogProps = Pick<Todo, "id" | "title" | "description">;

export function EditTodoDialog({
  id,
  title,
  description,
}: EditTodoDialogProps) {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: title,
      description: description,
    },
    resolver: zodResolver(editOrCreateTodoSchema),
  });

  const { toast } = useToasty();
  const mutation = useEditTodoMutation();

  const onSubmit = (values: FormValues) => {
    mutation.mutate({ id: id, ...values });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      handleClose();
      toast.success("Tarefa editada com sucesso");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) {
      handleClose();
      toast.success("Error ao atualizar a tarefa");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isError]);

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="editar todo"
        onClick={handleClickOpen}
      >
        <Edit />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogContent>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Título"
                  type="text"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Descrição"
                  type="text"
                  multiline
                  rows={4}
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="warning"
              onClick={handleClose}
              disabled={mutation.isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={mutation.isLoading}
            >
              Salvar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
