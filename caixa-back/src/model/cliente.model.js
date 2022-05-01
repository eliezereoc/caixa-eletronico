import mongoose from "mongoose";

const DadosCaixa = mongoose.model("dadosCaixa", {
  nome: String,
  valor: String,
});

export default DadosCaixa;
