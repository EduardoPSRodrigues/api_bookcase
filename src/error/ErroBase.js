class ErroBase extends Error {
  constructor(message = "Erro interno do servidor", status = 500) {
    super(message); //Obrigatório quando se estende de Error
    // this.name = this.constructor.name;
    this.message = message;
    this.status = status; // Status HTTP padrão para erros
    // this.stack = (new Error()).stack;
  }

  //   toString() {
  //     return `${this.name}: ${this.message}`;
  //   }

  // Método para enviar a resposta de erro
  enviarResposta(res) {
    res.status(this.status).send({
      message: this.message,
      status: this.status,
    });
  }
}

export default ErroBase;