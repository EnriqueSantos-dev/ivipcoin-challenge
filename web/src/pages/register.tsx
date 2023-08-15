import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";

import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { signUp } from "@/services/auth.service";

import { useToasty } from "@/hooks";

const formSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(5, "O nome deve ter no mínimo 5 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  email: z
    .string({ required_error: "O email é obrigatório" })
    .email("O email é inválido"),
  password: z
    .string({ required_error: "O email é obrigatório" })
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(50, "A senha deve ter no máximo 50 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToasty();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await signUp(values);
      toast.success("Sua conta foi criada com sucesso!");
      navigate("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Nome"
                autoComplete="email"
                autoFocus
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error?.message}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                autoFocus
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error?.message}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                margin="normal"
                fullWidth
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error?.message}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/login">
                Já tem uma conta? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
