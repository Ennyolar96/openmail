import "reflect-metadata";
import { appErrorHandler } from "@/global/middleware";
import { applicationMiddlewares } from "@/app.module";
import dotenv from "dotenv";
import express from "express";


dotenv.config({ quiet: true });

export const createApp = () => {
  const app = express();
  applicationMiddlewares(app);
  app.use(appErrorHandler);

  const PORT = process.env.PORT || 5001;
  // swaggerDocs(app, PORT);
  return { app, PORT };
};

export const { app, PORT } = createApp();
export default app;

// Vercel’s `@vercel/node` runtime expects `module.exports` for CommonJS.
// Keeping the default export too makes local imports work as well.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(module as any).exports = app;

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

if (require.main === module) {
  void bootstrap();
}
