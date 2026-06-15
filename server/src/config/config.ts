import "dotenv/config"
const _config = {
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING!,
  PORT: process.env.PORT! || 8000,
  JWT_SECRET: process.env.JWT_SECRET!,
};

export const config = Object.freeze(_config);
