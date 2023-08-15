import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Logout } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Link,
  Stack,
  Toolbar,
} from "@mui/material";

import { useAuthStore } from "@/hooks";

import { removeAccessToken } from "@/helpers/auth-local-storage";

const extractInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[0]}`;
};

export function NavBar() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const onLogout = () => {
    removeAccessToken();
    navigate("/login");
  };

  return (
    <Box>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} to="/" fontSize="body">
              <Box width={120} height="auto">
                <img
                  src="/logo.png"
                  alt="logo"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Link>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              disableElevation
              startIcon={<Logout />}
              onClick={onLogout}
            >
              Sair
            </Button>
            {user && <Avatar>{extractInitials(user.name)}</Avatar>}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
