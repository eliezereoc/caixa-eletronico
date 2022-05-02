const app = require("./src/server/server");

app.listen(process.env.PORT_LISTEN, () => {
  logger.info(
    `${process.env.APP_NAME} iniciada com sucesso na porta ${process.env.PORT_LISTEN}!`
  );
});
