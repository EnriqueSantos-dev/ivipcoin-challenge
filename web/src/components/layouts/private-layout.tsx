import { useEffect } from "react";

import { Outlet, useLoaderData } from "react-router-dom";

import { Stack } from "@mui/material";

import { NavBar } from "@/components";

import { useAuthStoreActions } from "@/hooks";

import { User } from "@/types";

export default function PrivateLayout() {
  const { user } = useLoaderData() as { user: User };
  const { setUser } = useAuthStoreActions();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <Stack direction="column" height="100vh">
      <NavBar />
      <Outlet />
    </Stack>
  );
}
