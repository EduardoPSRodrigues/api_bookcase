import mongoose from "mongoose";

/* Captura erros de validação e outros erros do Mongoose, utilizando sempre o `next` para passar o erro para 
o middleware. O middleware deve ser configurado no arquivo principal da aplicação (app.js) e utiliza 4 parâmetros */
// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  // console.log(error); // Log do erro no console

  if (error instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .send({ message: "Um ou mais dados fornecidos estão incorretos." });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const mensagensError = Object.values(error.errors)
      .map(erro => erro.message)
      .join("; ");

    res.status(400).send({ message: `Os seguintes erros forão encontrados: ${mensagensError}` });
  }
  else {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}

export default manipuladorDeErros;
