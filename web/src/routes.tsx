import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

import PrivateLayout from "@/components/layouts/private-layout";

import App from "./App";
import { loaderPrivateLayout } from "@/shared/loaders/private-layout";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route Component={App} path="/">
      <Route Component={PrivateLayout} path="/" loader={loaderPrivateLayout}>
        <Route Component={HomePage} index />
      </Route>
      <Route path="login" Component={LoginPage} />
      <Route path="registrar" Component={RegisterPage} />
    </Route>
  )
);
