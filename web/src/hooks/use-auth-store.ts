import { create } from "zustand";

import { getProfile } from "@/services/auth.service";

import { getAccessToken } from "@/helpers/auth-local-storage";

import { User } from "@/types";

type AuthStoreState = {
  token?: string;
  user?: User;
  actions: {
    getProfile: () => void;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
  };
};

export const AuthStore = create<AuthStoreState>((set) => ({
  token: getAccessToken() ?? undefined,
  user: undefined,
  actions: {
    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
    getProfile: async () => {
      const user = await getProfile();
      set({ user });
    },
  },
}));

export const useAuthStore = AuthStore;
export const useAuthStoreActions = () => AuthStore.getState().actions;
