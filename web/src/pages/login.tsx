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

import { signIn } from "@/services/auth.service";

import { useAuthStoreActions, useToasty } from "@/hooks";

import { setAccessToken } from "@/helpers/auth-local-storage";

import { api } from "@/lib/axios";

const formSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório" })
    .min(1, "O email é obrigatório"),
  password: z
    .string({ required_error: "O email é obrigatório" })
    .min(1, "A senha é obrigatória"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStoreActions();
  const { toast } = useToasty();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { user, access_token } = await signIn(values);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      setToken(access_token);
      setUser(user);
      setAccessToken(access_token);
      toast.success("Login realizado com sucesso!, redirecionando...");
      navigate("/");
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
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
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
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/registrar">
                Não tem uma conta? Registre-se
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
