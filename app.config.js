import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      BACKEND_HOST: process.env.BACKEND_HOST,
    },
  }
};
