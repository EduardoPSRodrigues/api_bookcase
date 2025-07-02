import mongoose from "mongoose";
import ErroBase from "../error/ErroBase.js";
import RequisicaoIncorreta from "../error/RequisicaoIncorreta.js";
import ErroValidacao from "../error/ErroValidacao.js";
import NaoEncontrado from "../error/NaoEncontrado.js";

/* Captura erros de validação e outros erros do Mongoose, utilizando sempre o `next` para passar o erro para 
o middleware. O middleware deve ser configurado no arquivo principal da aplicação (app.js) e utiliza 4 parâmetros */
// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  // console.log(error); // Log do erro no console

  if (error instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(error).enviarResposta(res);
  } else if (error instanceof NaoEncontrado) {
    error.enviarResposta(res);
  }
  else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
