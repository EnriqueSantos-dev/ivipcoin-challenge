import * as dotEnv from "dotenv-safe";

dotEnv.config();

export const env = {
  port: process.env.PORT,
};
