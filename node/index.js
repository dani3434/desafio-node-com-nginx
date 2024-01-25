const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `;

    connection.query(createTableQuery, (error) => {
      if (error) {
        console.error("Erro ao criar a tabela:", error);
      } else {
        console.log("Tabela criada com sucesso");
        startServer();
      }
    });
  }
});

function startServer() {
  // Inicia o servidor Express
  app.get("/", (req, res) => {
    const daniel = "INSERT INTO people (name) VALUES ('Daniel ')";

    connection.query(daniel, (error) => {
      if (error) {
        console.error("Erro ao inserir registro:", error);
        res.status(500).send("Erro ao inserir registro no banco de dados");
      } else {
        connection.query("SELECT * FROM people", (error, results) => {
          if (error) throw error;

          let names = results.map((result) => result.name);
          res.send(`<h1>Full Cycle Rocks!</h1>\n\n${names.join("\n")}`);
        });
      }
    });
  });

  app.listen(port, () => {
    console.log("Rodando na porta " + port);
  });
}
