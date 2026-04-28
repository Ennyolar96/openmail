import type { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import express from "express";
import cors from "cors";
import hpp from "hpp";
import compression from "compression";
import os from "os";

export const applicationMiddlewares = (app: Application) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    }),
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(cors());
  app.set("trust proxy", 1);
  app.use(hpp());
  app.use(compression());
  app.disable("x-powered-by");

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=()",
    );
    next();
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const isDev = process.env.NODE_ENV === "development";
    console.log(
      `Incoming Request: ${req.method} ${req.url} ${os.platform()} ${req.ip}`,
    );

    if (!isDev) {
      const xfProto = (req.headers["x-forwarded-proto"] || "") as string;
      const isForwardedSecure = xfProto.split(",")[0]?.trim() === "https";
      const isSecure = req.secure || isForwardedSecure;

      const host = req.hostname;
      const approve = ["localhost", "127.0.0.1", "::1"];
      const isLocal = approve.includes(host);

      if (!isSecure && !isLocal) {
        return res.redirect(
          301,
          `https://${req.headers.host}${req.originalUrl}`,
        );
      }
    }

    next();
  });

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "OK",
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    });
  });

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Welcome");
  });
};
