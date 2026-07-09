import "dotenv/config"
const _config = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING!,
  PORT: process.env.PORT! || 7000,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
};

export const config = Object.freeze(_config);
