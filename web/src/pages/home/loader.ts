import { redirect } from "react-router-dom";

import { verifyToken } from "@/services/auth.service";

export async function loaderHomePage() {
  try {
    await verifyToken();
    return null;
  } catch (error) {
    return redirect("/login");
  }
}
