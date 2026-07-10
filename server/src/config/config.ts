import "dotenv/config"
const _config = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING!,
  PORT: process.env.PORT! || 7000,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN!,
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN!,
};

export const config = Object.freeze(_config);
