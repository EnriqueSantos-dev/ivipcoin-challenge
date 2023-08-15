import { api } from "../lib/axios";
import { User } from "@/types";

type SignInInput = {
  email: string;
  password: string;
};

type SignInResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  access_token: string;
};

export async function signIn({ email, password }: SignInInput) {
  const { data } = await api.post<SignInResponse>("/auth/login", {
    email,
    password,
  });
  return data;
}

type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

type SignUpResponse = {
  id: string;
  name: string;
  email: string;
};

export async function signUp({ name, email, password }: SignUpInput) {
  const { data } = await api.post<SignUpResponse>("/users", {
    name,
    email,
    password,
  });
  return data;
}

export async function getProfile() {
  const { data } = await api.get<User>("/auth/profile");
  return data;
}

export async function verifyToken() {
  await api.post("/auth/verify-token");
}
