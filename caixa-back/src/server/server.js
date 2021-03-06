const express = require("express");
const cors = require("cors");
const winston = require("winston");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require("path");
const clienteRoutes = require("../routes/cliente.route");
const caixaRoutes = require("../routes/caixa.route");
const dotenv = require("dotenv/config");

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

// const __dirname = path.resolve();

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
// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", async (req, res) => {
  res.status(200).send("Server online");
});
app.use("/cliente", clienteRoutes);
app.use("/caixa", caixaRoutes);

//Middleware de errors
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  // res.status(200).sendFile(`${__dirname}/public/pages/not-found.html`);
  res.status(400).send({ error: err.message });
});

module.exports = app;
