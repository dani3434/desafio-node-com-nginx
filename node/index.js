const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodedb",
};
const msyql = require("mysql");
const connection = msyql.createConnection(config);

app.get("/", (req, res) => {
  connection.query("SELECT * FROM people", (error, results) => {
    if (error) throw error;

    let names = results.map((result) => result.name);
    res.send(`<h1>Full Cycle Rocks!</h1>\n\n${names.join("\n")}`);
  });
});

app.listen(port, () => {
  console.log("Rodaando na porta " + port);
});
