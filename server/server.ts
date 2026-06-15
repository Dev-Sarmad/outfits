import { config } from "./src/config/config.ts";
import databaseConnection from "./src/config/db.ts";
import app from "./src/app.ts";

app.get("/", (req, res) => {
  return res.json({ message: "hellow world " });
});

const startServer = async () => {
  try {
    await databaseConnection();
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();