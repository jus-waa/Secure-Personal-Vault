import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const client = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // ← must be app password, NOT your login password
  },
});

export const sender = {
  email: process.env.GMAIL_USER,
  name: "Sky Vault",
};
/*
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};
*/