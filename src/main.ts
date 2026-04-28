import { applicationMiddlewares } from "@/app.module";
import { appErrorHandler } from "@/global/middleware";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";


dotenv.config({ quiet: true });

const app = express();
applicationMiddlewares(app);
app.use(appErrorHandler);
const PORT = process.env.PORT || 5001;

async function bootstrap() {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

  const gracefulShutdown = async () => {
    console.log("Shutting down gracefully...");
    process.exit(0);
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
  process.on("unhandledRejection", gracefulShutdown);
  process.on("uncaughtException", gracefulShutdown);
}

void bootstrap();
