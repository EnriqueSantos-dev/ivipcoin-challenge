import { useEffect, useState } from "react";

import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDeleteTodoMutation, useToasty } from "@/hooks";

type DeleteTodoAlertProps = {
  todoId: string;
};

export function DeleteTodoAlert({ todoId }: DeleteTodoAlertProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useDeleteTodoMutation();
  const { toast } = useToasty();

  const onConfirmDelete = () => {
    mutation.mutate(todoId);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Tarefa deletada com sucesso");
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) {
      toast.success("Falha ao deletar a tarefa");
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isError]);

  return (
    <div>
      <IconButton
        color="error"
        aria-label="abrir modal delete todo"
        onClick={() => setIsOpen(true)}
      >
        <DeleteForever />
      </IconButton>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Deletar tarefa?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja deletar a tarefa? essa ação é
            irreversível.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            disabled={mutation.isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            autoFocus
            onClick={onConfirmDelete}
            disabled={mutation.isLoading}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
