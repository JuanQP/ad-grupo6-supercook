import 'dotenv/config';
import { ConfigContext } from "expo/config";

export default ({ config }: ConfigContext) => {
  const { BACKEND_HOST } = process.env
  if(!BACKEND_HOST) {
    throw new Error("Env variable BACKEND_HOST is required")
  }

  return {
    ...config,
    extra: {
      BACKEND_HOST,
    },
  }
};
