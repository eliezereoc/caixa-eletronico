const mongoose = require("mongoose");

const DadosCaixa = mongoose.model("dadosCaixa", {
  nome: String,
  valor: String,
});

export default DadosCaixa;
