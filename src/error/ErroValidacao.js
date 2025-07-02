import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(error) {
    const mensagensError = Object.values(error.errors)
      .map(erro => erro.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${mensagensError}`);
  }

//   enviarResposta(res) {
//     res.status(this.status).send({
//       message: "Os seguintes erros foram encontrados:",
//       errors: this.mensagens,
//       status: this.status,
//     });
//   }
}

export default ErroValidacao;