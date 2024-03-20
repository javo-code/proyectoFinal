import { createTransport } from "nodemailer";
import "dotenv/config";

export const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Deshabilitar la verificación del certificado para que funcione
  }
});