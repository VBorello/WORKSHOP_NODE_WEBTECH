const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); // Corrigido 'expresse' para 'express'
app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date().toString(), req.host, req.method, req.url);
  next();
});

app.get("/", function (req, res) {
  res.send(`s`);
});

app.get("/Alcione", function (req, res) {
  res.send(`q`);
});

app.get("/olá", function (req, res) {
  let nome = req.query.nome;
  res.send(`Olá ${nome}`);
});

app.get("/registro", (req, res) => {
  res.send(`
        <form method="POST" action="/registro">
            <input type="text" name="nome" placeholder="Nome" />
            <input type="text" name="email" placeholder="Email" />
            <button type="submit">Enviar</button>
        </form>
    `);
});

app.post("/registro", (req, res) => {
  const { nome, email } = req.body; 
  res.send(`Registro recebido com sucesso! Nome: ${nome}, Email: ${email}`);
});

const produtos = [
    { id: 1, nome: 'Produto 1', preco: 10.00},
    { id: 2, nome: 'Produto 2', preco: 20.00},
    { id: 3, nome: 'Produto 3', preco: 30.00}
];

app.get('/produtos', ())

app.listen(6969, function () {
  console.log("Servidor rodando na porta 6969");
});
