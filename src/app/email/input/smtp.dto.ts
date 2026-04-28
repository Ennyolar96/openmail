import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import type {
  mailAttachment,
  mailConfig,
  mailInput,
  SendMailInput,
} from "./smtp.interface";
import { Transform, Type } from "class-transformer";

class MailAuth {
  @IsString({ message: "Mail User should be string" })
  @IsNotEmpty({ message: "Mail User is required" })
  user: string;
  @IsString({ message: "Mail Pass should be string" })
  @IsNotEmpty({ message: "Mail Pass is required" })
  pass: string;
}

class SendMailConfig implements mailConfig {
  @IsString({ message: "Mail Host should be string" })
  @IsNotEmpty({ message: "Mail Host is required" })
  host: string;

  @IsNumber(
    {
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    { message: "Mail Port should be number" },
  )
  @IsNotEmpty({ message: "Mail Port is required" })
  port: number;

  @IsOptional()
  @IsBoolean({ message: "Mail Secure should be boolean" })
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    return value;
  })
  secure: boolean;

  @IsObject({ message: "Mail Auth should be object" })
  @Type(() => MailAuth)
  @ValidateNested()
  auth: MailAuth;
}

class MailAttachment implements mailAttachment {
  @IsString({ message: "Filename should be string" })
  @IsOptional()
  filename?: string;

  @IsString({ message: "Content should be string (base64 or text)" })
  @IsOptional()
  content?: string;

  @IsString({ message: "Path should be a valid string URL or file path" })
  @IsOptional()
  path?: string;

  @IsString({ message: "ContentType should be string, e.g. image/png" })
  @IsOptional()
  contentType?: string;

  @IsString({ message: "CID should be string" })
  @IsOptional()
  cid?: string;
}

class SendMail implements mailInput {
  @IsString({ message: "Mail From should be string" })
  @IsNotEmpty({ message: "Mail From is required" })
  from: string;

  @IsArray({ message: "Mail To should be array" })
  @ArrayNotEmpty({ message: "Mail To should not be empty" })
  @ArrayMaxSize(50, { message: "Mail To should not pass 50" })
  @IsString({ each: true, message: "Mail To should be string" })
  to: string[];

  @IsString({ message: "Mail Subject should be string" })
  @IsNotEmpty({ message: "Mail Subject is required" })
  subject: string;

  @IsString({ message: "Mail Html should be string" })
  @IsOptional()
  html?: string;

  @IsString({ message: "Mail Text should be string" })
  @IsOptional()
  text?: string;

  @IsArray({ message: "Attachments should be an array" })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MailAttachment)
  attachments?: MailAttachment[];
}

export class SendMailRequest implements SendMailInput {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SendMailConfig)
  config: SendMailConfig;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SendMail)
  mail: SendMail;
}
