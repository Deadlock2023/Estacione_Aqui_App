const express = require("express");
const crypto = require("crypto");
const mysql = require("mysql2/promise");
const bodyparser = require("body-parser");
const { ADDRGETNETWORKPARAMS } = require("dns");

const app = express();
const port = 3292;

app.use(express.json());

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "estacione_aqui",
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0
});

// Rota para gerar e retornar o hash SHA-256 de uma string
app.get("/hash", (req, res) => {

  const { string } = req.query

  if (!string) {
    res.json({ msg: "Nenhuma resposta entregue!" })
  }

  const hash = crypto.createHash("SHA256").update(string).digest("hex")

  res.json({ msg: hash })

});

app.post("/cadastrar", async (req, res) => {
  try {


    const { usuario, email, login, senha } = req.body


    // if(!login){
    //   res.json({msg:"Todos os campos devem ser preenchidos!"})
    // }
    // else if(!senha){
    //   res.json({msg:"Todos os campos devem ser preenchidos!"})

    // }
    const hash = crypto.createHash("SHA256").update(senha).digest("hex")

    const sql = `INSERT INTO usuarios (usuario, email, login, senha) VALUES (LOWER("${usuario}"), LOWER("${email}"), LOWER("${login}"), "${hash}")`;

    const conexao = await pool.getConnection()

    const [linha] = await conexao.execute(sql)

    conexao.release()


    res.json({ msg: "Cadastro realizado!" })


  } catch (error) {
    console.log(`O erro que ocorreu foi: ${error}`);
    res.status(500).json({ error: "Algo de errado aconteceu!" });
  }
});

// Rota para verificar o login
app.post("/login", async (req, res) => {
  try {

    const { login, senha } = req.body

    const hash = crypto.createHash("SHA256").update(senha).digest("hex")

    const conexao = await pool.getConnection()

    const sql =
    `SELECT * FROM usuarios WHERE login = LOWER("${login}") AND senha = "${hash}" `
    
    /*` SELECT c.id, 
    CASE 
          WHEN c.senha = SHA2('${hash}',256) THEN 'True' 
          ELSE 'False' 
      END AS senha_corresponde
  FROM cadastro c 
  WHERE c.id = (select   c1.id FROM cadastro c1 WHERE c1.login = '${login}')`*/

    const [linha] = await conexao.execute(sql)

    // console.log(linha)
    conexao.release()
    if (linha.length === 1) {
      res.status(200).json({msg:"login válido!, bem vindo:", login: `${linha[0].login}`})
    } else {
      res.status(401).json({msg:"Login ou senha inválido!"})
    }

  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({ error: "Erro interno ao processar login" });
  }
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
