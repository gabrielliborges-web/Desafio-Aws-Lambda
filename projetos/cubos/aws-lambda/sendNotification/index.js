"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const handler = async (event) => {
    try {
        console.log("Evento recebido:", event);
        const { movie, to } = event;
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        const html = `
      <div style="font-family:Arial, sans-serif; padding:20px; background-color:#fafafa; color:#333;">
        <h2 style="color:#521A95; margin-bottom:10px;">🎬 Estreia imperdível: ${movie.title}</h2>
        ${movie.imagePoster
            ? `<img src="${movie.imagePoster}" alt="${movie.title}" style="width:100%; max-width:400px; border-radius:8px; margin:10px 0;">`
            : ""}
        <p style="font-size:15px; line-height:1.6;">
          <strong>${movie.tagline || ""}</strong><br>
          ${movie.description || ""}
        </p>
        ${movie.releaseDate
            ? `<p style="margin-top:10px;"><strong>📅 Data de lançamento:</strong> ${new Date(movie.releaseDate).toLocaleDateString("pt-BR")}</p>`
            : ""}
        ${movie.linkPreview
            ? `<p style="margin-top:20px;"><a href="${movie.linkPreview}" target="_blank" style="color:#521A95; text-decoration:none; font-weight:bold;">▶ Assistir trailer</a></p>`
            : ""}
        <hr style="margin:20px 0;">
        <p style="color:#777; font-size:12px;">Enviado automaticamente via AWS Lambda 🚀</p>
      </div>
    `;
        await new Promise((resolve, reject) => {
            transporter.sendMail({
                from: `"Notificações MovieApp" <${process.env.SMTP_USER}>`,
                to,
                subject: `🎥 Lançamento: ${movie.title}`,
                html,
            }, (err, info) => (err ? reject(err) : resolve(info)));
        });
        console.log("E-mail enviado com sucesso!");
        return { statusCode: 200, body: "Notificação enviada com sucesso!" };
    }
    catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return { statusCode: 500, body: "Falha ao enviar notificação." };
    }
};
exports.handler = handler;
