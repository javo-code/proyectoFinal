import "dotenv/config";
import { template } from "../templates/template.js";
import { transporter } from "../services/email.services.js";

export const sendGmail = async (req, res) => {
  try {
    const { dest, name } = req.body;
    const gmailOptions = {
      from: process.env.EMAIL,
      to: dest,
      subject: "Bienvenida/o!",
      // text: ''
      // html: `<h1>Bienvenido/a al Ecommerce de Javo!</h1>`
      html: template,
      attachments: [
        {
          path: process.cwd() + "/src/services/text.txt",
          filename: `cuenta-Banco-Romero-${name}`,
        }, 
      ],
    };
    const response = await transporter.sendMail(gmailOptions);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
