import { Router, type NextFunction, type Request, type Response } from "express";
import { SendMailRequest } from "./input";
import { SmtpController } from "./smtp.controller";
import { validateBody } from "@/global/middleware";

const router = Router();
const smtpController = new SmtpController();

router.post(
  "/send-mail",
  validateBody<SendMailRequest>(SendMailRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await smtpController.sendMail(req.body as SendMailRequest);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

export const smtpRouter = { router };
