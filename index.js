const express = require("express");
const app = express();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);

app.use((req, res, next) => {
  console.log(new Date().toString(), req.host, req.method, req.url);
  next();
});

app.use(express.static("public"));

const routerAPI = express.Router();
app.use("/api", routerAPI);

routerAPI.use(express.urlencoded({ extended: true }));
routerAPI.use(express.json());
routerAPI.get("/", (req, res) => {
  res.send("Hello World");
});

routerAPI.get("/rommel", (req, res) => {
  res.send("Rommel Carneiro");
});

routerAPI.get("/ola", (req, res) => {
  let nome = req.query.nome;
  res.send(`Olá ${nome}`);
});

routerAPI.get("/registro", (req, res) => {
  // monta um formulário HTML para receber os dados do usuário
  res.send(`
        <form method="POST" action="/registro">
            <input type="text" name="nome" placeholder="Nome" />
            <input type="text" name="email" placeholder="Email" />
            <button type="submit">Enviar</button>
        </form>
    `);
});
routerAPI.post("/registro", (req, res) => {
  res.send(`Registro recebido com sucesso! <br>
        Usuário ${req.body.nome} cadastrado com sucesso!`);
});

const produtos = [
  { id: 1, nome: "Produto 1", preco: 10.0 },
  { id: 2, nome: "Produto 2", preco: 20.0 },
  { id: 3, nome: "Produto 3", preco: 30.0 },
];

app.get("/produtos", (req, res) => {
  knex
    .select("*")
    .from("produtos")
    .then((produtos) => {
      res.json(produtos);
    });
  res.json(produtos);
});

app.post("/produtos", (req, res) => {
  try {
    const novoProduto = {
      descricao: req.body.descricao,
      valor: req.body.valor,
      marca: req.body.marca,
    };

    knex("produtos")
      .insert(novoProduto, ["id"])
      .then((dados) => {
        let id = dados[0].id;
        novoProduto.id = id;
        res.status(201).json(novoProduto);
      })
      .catch((error) => {
        console.error("Erro ao inserir produto:", error);
        res.status(500).send("Erro ao inserir produto");
      });
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).send("Erro no servidor");
  }
});

app.use((req, res) => {
  console.log("Rota não encontrada");
  res.status(404).send("Rota não encontrada");
});

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
