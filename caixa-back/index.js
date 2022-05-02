import express from "express";
import cors from "cors";

import winston from "winston";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { swaggerDocument } from "./doc.js";
import clienteRoutes from "./src/routes/cliente.route.js";
import caixaRoutes from "./src/routes/caixa.route.js";
import dotenv from "dotenv/config.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./src/logs/caixa-back.log",
    }),
  ],
  format: combine(label({ label: "caixa-back" }), timestamp(), myFormat),
});

const __dirname = path.resolve();

global.userLoggedId = "";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite solicitações por janela
});

const app = express();

app.use(express.json());
app.use(cors());

app.use(helmet()); // oculta qual servidor estou utilizando
app.use(limiter); //aplicar a todas as solicitaçoes

// app.use(express.static("public"));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/cliente", clienteRoutes);
app.use("/caixa", caixaRoutes);

//Middleware de errors
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  // res.status(200).sendFile(`${__dirname}/public/pages/not-found.html`);
  res.status(400).send({ error: err.message });
});

app.listen(process.env.PORT_LISTEN, () => {
  logger.info(
    `${process.env.APP_NAME} iniciada com sucesso na porta ${process.env.PORT_LISTEN}!`
  );
});
