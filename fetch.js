console.log("Iniciou");

fetch("https://api.github.com/users/rommelcarneiro")
  .then((resposta) => resposta.json())
  .then((dados) => {
    console.log("processou");
    console.log(dados.bio);
  });
delay(5000);
console.log("terminou");
