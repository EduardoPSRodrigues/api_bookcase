import NaoEncontrado from "../error/NaoEncontrado.js";

function manipulador404(req, res, next) {
  const erro404 = new NaoEncontrado();
  next(erro404); // Passa o erro 404 para o próximo middleware
}

export default manipulador404;