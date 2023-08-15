import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useToasty } from "@/hooks";
import { useCreateTodoMutation } from "@/hooks/use-create-todo";

import { editOrCreateTodoSchema } from "@/shared/form-schemas/edit-or-create-todo";

type FormValues = z.infer<typeof editOrCreateTodoSchema>;

export function CreateNewTodoDialog() {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(editOrCreateTodoSchema),
  });

  const { toast } = useToasty();
  const mutation = useCreateTodoMutation();

  const onSubmit = (values: FormValues) => {
    mutation.mutate({ ...values, completed: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      reset({ title: "", description: "" });
      handleClose();
      toast.success("Tarefa criada com sucesso");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) {
      toast.success("Error ao criar a tarefa");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isError]);

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        aria-label="criar tarefa"
        disableElevation
        size="large"
        startIcon={<Add />}
        sx={{ flexShrink: 0, whiteSpace: "nowrap" }}
        onClick={handleClickOpen}
      >
        Criar Tarefa
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Criar Tarefa</DialogTitle>
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
              Criar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
