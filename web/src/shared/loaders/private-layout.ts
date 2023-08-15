import { redirect } from "react-router-dom";

import { getProfile } from "@/services/auth.service";

export async function loaderPrivateLayout() {
  try {
    const user = await getProfile();
    return { user };
  } catch (error) {
    return redirect("/login");
  }
}
