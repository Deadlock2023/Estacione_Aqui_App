const nodemailer = require('nodemailer');
const express = require("express");
const crypto = require("crypto");
const mysql = require("mysql2/promise");
const bodyparser = require('body-parser');
const path = require("path");
const multer = require('multer');
const fs = require("fs");
const app = express();
const port = 3292;

// Configuração do middleware
app.use(bodyparser.json());
app.use(express.json({ limit: '1000mb' }));

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

// Configuração para servir arquivos estáticos da pasta "uploads"
const uploadsDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDir)); // Agora as imagens serão servidas em /uploads

// Configuração do multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Gera um nome único
  },
});

const upload = multer({ storage });

// Rota para upload de imagem
app.post('/uploads/criar/', upload.single('file'), async (req, res) => {
  const userId = req.body.userId; // Assuma que o ID do usuário é enviado no body
  const uploadedFile = req.file;

  console.log('Caiu aqui vei')

  if (!uploadedFile) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado!' });
  }

  const newFilePath = `/uploads/${uploadedFile.filename}`;

  try {
    // Obtém conexão do pool
    const connection = await pool.getConnection();

    try {
      // Verifica se já existe uma foto para o usuário
      const [rows] = await connection.query('SELECT foto FROM usuarios WHERE id = ?', [userId]);

      if (rows.length > 0) {
        // Substitui a imagem existente
        const oldFilePath = rows[0].foto ? path.join(__dirname, rows[0].foto) : null;

        await connection.query('UPDATE usuarios SET foto = ? WHERE id = ?', [newFilePath, userId]);

        // Remove o arquivo antigo, se existir
        if (oldFilePath && fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }

        res.status(200).json({ message: 'Foto atualizada com sucesso!', path: newFilePath });
      } else {
        // Insere o novo registro
        await connection.query('INSERT INTO usuarios (id, foto) VALUES (?, ?)', [userId, newFilePath]);

        res.status(201).json({ message: 'Foto salva com sucesso!', path: newFilePath });
      }
    } finally {
      connection.release(); // Libera a conexão de volta para o pool
    }
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    res.status(500).json({ error: 'Erro ao processar a solicitação!' });
  }
});

// Rota para gerar e retornar o hash SHA-256 de uma string
app.get("/hash", (req, res) => {
  const { string } = req.query;

  if (!string) {
    res.json({ msg: "Nenhuma resposta entregue!" });
  }

  const hash = crypto.createHash("SHA256").update(string).digest("hex");
  res.json({ msg: hash });
});

// Rota para retornar a URL de uma imagem baseada no ID do usuário
app.get("/user-image", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const [rows] = await pool.query("SELECT foto FROM usuarios WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const imageName = rows[0].foto;
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${imageName}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Erro ao buscar imagem:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

//----------------------------------------------------------------||----------------------------------------------------------------//
//   ____________
//        |          _____               _               _____       _       ___        _        ___    _________   ___     ___
//        |          |        |         / \             /           / \      |  \      / \      /   \       |      |   \   /   \
//        |          |___     |        /___\            |          /___\     |   |    /___\     \___        |      |___/  /     \
//        |          |        |       /     \           |         /     \    |   |   /     \        \       |      | \    \     /
//        |          |____    |____  /       \          \_____   /       \   |__/   /       \   \___/       |      |  \    \___/

app.post("/cadastrar", async (req, res) => {
  try {

    const { usuario, email, senha } = req.body

    const hash = crypto.createHash("SHA256").update(senha).digest("hex")
    
    const conexao = await pool.getConnection()

    const sql = `INSERT INTO usuarios (usuario, email, senha) VALUES (LOWER("${usuario}"), LOWER("${email}"), "${hash}")`;

    const [linha] = await conexao.execute(sql)

    res.json({ msg: "Cadastro realizado!" })
    conexao.release()

  } catch (error) {
    console.log(`O erro que ocorreu foi: ${error}`);
    res.status(500).json({ error: "Algo de errado aconteceu!" });
  }
});

//----------------------------------------------------------------||----------------------------------------------------------------//
//   ____________     
//        |          _____               _                              ___        
//        |          |        |         / \                |           /   \      ____     O    |\   |
//        |          |___     |        /___\               |          /     \    /    \         | \  |
//        |          |        |       /     \              |          \     /   |   ___    |    |  \ |
//        |          |____    |____  /       \             |____       \___/     \____/    |    |   \| 

app.post("/login", async (req, res) => {
  try {

    const { email, senha } = req.body

    const hash = crypto.createHash("SHA256").update(senha).digest("hex")

    const conexao = await pool.getConnection()

    const sql =
    `SELECT * FROM usuarios WHERE email = "${email}" AND senha = "${hash}" `
    

    const [linha] = await conexao.execute(sql)

    // console.log(linha)
    if (linha.length === 1) {
      res.status(200).json({msg:"login válido!, bem vindo:", id: `${linha[0].id}`, usuario: `${linha[0].usuario}`})
    } else {
      res.status(401).json({msg:"Login ou senha inválido!"})
    }
    
    conexao.release()
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({ error: "Erro interno ao processar login" });
  }
});

// Configuração de envio de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'estacioneaquiapp20@gmail.com',
    pass: 'wivi rpzk tihw jobq',
  },
  secure: true,
  port: 465,
  timeout: 10000,
});

// Função para gerar código de verificação
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Rota para solicitar redefinição de senha
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const verificationCode = generateVerificationCode();
  const expirationTime = new Date(Date.now() + 3600000); // expira em 1 hora

  try {
    const connection = await pool.getConnection();
    const query = 'UPDATE usuarios SET verification_code = ?, verification_expires = ? WHERE email = ?';
    const [result] = await connection.execute(query, [verificationCode, expirationTime, email]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const mailOptions = {
      from: 'estacioneaquiapp20@gmail.com',
      to: email,
      subject: 'Redefinição de Senha - Estacione Aqui',
      text: `Você solicitou a redefinição de senha. Seu código de verificação é: ${verificationCode}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erro ao enviar e-mail:', error);
        return res.status(500).json({ error: 'Erro ao enviar e-mail' });
      }
      res.json({ message: 'Código de verificação enviado para o seu e-mail' });
    });
  } catch (err) {
    console.error('Erro ao enviar código de verificação:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para verificar o código de redefinição
app.post('/verify-code', async (req, res) => {
  const { code, email } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email e código de verificação são obrigatórios' });
  }

  try {
    const connection = await pool.getConnection();
    const query = 'SELECT * FROM usuarios WHERE email = ? AND verification_code = ? AND verification_expires > ?';
    const [results] = await connection.execute(query, [email, code, new Date()]);
    connection.release();

    if (results.length === 0) {
      return res.status(400).json({ error: 'Código de verificação inválido ou expirado' });
    }

    res.json({ success: true, message: 'Código verificado com sucesso' });
  } catch (error) {
    console.error('Erro ao verificar código de verificação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para redefinir senha
app.post('/reset-password', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Campos de e-mail e senha são obrigatórios.' });
  }

  try {
    const connection = await pool.getConnection();

    // Verifica se o e-mail existe no banco de dados
    const [user] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (user.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Criptografa a senha usando SHA-256
    const hash = crypto.createHash('SHA256').update(senha).digest('hex');

    // Atualiza a senha criptografada no banco de dados
    const query = 'UPDATE usuarios SET senha = ? WHERE email = ?';
    await connection.execute(query, [hash, email]);

    connection.release();

    res.json({ success: true, message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

/////////////////////// ROTA PARA MONTAR CARDS NO APP     ///////////////////////////////////////////////////

app.get('/montarcards', async (req, res) => {
  try {
      const conexao = await pool.getConnection()
      const sql = `SELECT nome, url_imagem, telefone, horario_abertura,horario_fechamento, endereco_nome FROM estabelecimentos`
      const [linhas] = await conexao.execute(sql)
      conexao.release()
      res.json(linhas)
  
  } catch (error) {
      console.log(`o erro que ocorreu foi : ${error}`)
      res.send(500).json({error:"deu alguem erro na busca"})
  }
  });
  
    
app.get('/localizar_estabelecimentos', async (req, res) => {
  try {""
      const conexao = await pool.getConnection()
      const sql = `SELECT nome, localizacao FROM estabelecimentos`
      const [linhas] = await conexao.execute(sql)
      conexao.release()
      res.json(linhas)
  
  } catch (error) {
      console.log(`o erro que ocorreu foi : ${error}`)
      res.send(500).json({error:"deu alguem erro na busca"})
  }
  });

//////Atualizar nome do usuario//////
app.post('/atualizar-usuario', (req, res) => {
  const { login, newName } = req.body;

  // Verifique se os dados necessários foram enviados
  if (!login || !newName) {
    return res.status(400).json({ error: 'Login e novo nome são obrigatórios!' });
  }

  // Query SQL para atualizar o nome no banco de dados
  const query = 'UPDATE usuarios SET nome = ? WHERE login = ?';

  // Executa a query
  db.query(query, [newName, login], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar no banco:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o nome no banco.' });
    }

    // Verifica se o registro foi encontrado e atualizado
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Nome atualizado com sucesso!' });
  });
});

//----------------------------------------------------------------||----------------------------------------------------------------//
//   ____________                                             _____                        ______
//        |          _____               _                    |    \     ___       ___     |        o   |        _____
//        |          |        |         / \                   |     |   |   \     /   \    |___         |        |
//        |          |___     |        /___\                  |____/    |___/    /     \   |        |   |        |___
//        |          |        |       /     \                 |         | \      \     /   |        |   |        |
//        |          |____    |____  /       \                |         |  \      \___/    |        |   |____    |____   picture

// Pegando a imagem do banco quando a tela carregar

app.get('/PickImage', async (req, res) => {
  try {
    const { id } = req.query;

    console.log(id);

    const conexao = await pool.getConnection();
    const query = `SELECT foto FROM usuarios WHERE id = ?`;

    let [linhas] = await conexao.execute(query, [id]);

    if (linhas.length > 0) {
      res.json({ foto: linhas[0].foto });
    } else {
      res.status(404).json({ error: "Imagem não encontrada" });
    }

    conexao.release();
  } catch (error) {
    console.log(`O Erro que ocorreu foi: ${error}`);
    res.status(500).json({ error: "Deu algum erro na conexão" });
  }
});

app.get('/informacoes-usuarios', async (req, res) => {
  try { 
    const { id } = req.query;

    const conexao = await pool.getConnection();
    const query = `SELECT * FROM usuarios WHERE id = ?`;

    let [linhas] = await conexao.execute(query, [id]);

    if (linhas.length > 0) {
      res.json({ dados: linhas[0] });
    } else {
      res.status(404).json({ error: "Imagem não encontrada" });
    }

    conexao.release();

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Deu algum erro na conexão" });
  }
})


// Upload da imagem pro banco

app.post('/upload', async (req, res) => {
  const { id, foto } = req.body;

  if (!foto) {
    return res.status(400).send('O campo "foto" precisa ser uma string Base64.');
  }

  try {
    const conexao = await pool.getConnection();
    const query = 'UPDATE usuarios SET foto = ? WHERE id = ?';

    await conexao.execute(query, [foto, id]);

    res.status(200).send('Foto salva com sucesso!');
  } catch (err) {
    console.error('Erro ao salvar no banco:', err);
    res.status(500).send('Erro ao salvar no banco.');
  } finally {
    conexao.release();
  }
});


app.put('/editar', async (req, res) => {
  const { userId, usuario, email } = req.body;

  if (!userId || !usuario || !email) {
    return res.status(400).send('Os campos precisam estar preenchidos');
  }

  let conexao;  // Declare conexao aqui para garantir seu acesso no finally
  try {
    conexao = await pool.getConnection();  // Atribua a conexão
    const query = 'UPDATE usuarios SET usuario = ?, email = ? WHERE id = ?';

    await conexao.execute(query, [usuario, email, userId]);

    res.status(200).send('Dados atualizados com sucesso!');
  } catch (err) {
    console.error('Erro ao salvar no banco:', err);
    res.status(500).send('Erro ao salvar no banco.');
  } finally {
    if (conexao) {  // Verifique se a conexão foi estabelecida antes de liberar
      conexao.release();
    }
  }
});


app.get('/api/capturarnome', async (req, res) => {
  try {
    const { id } = req.query; // Lendo o id da query string

    if (!id) {
      return res.status(400).json({ error: 'O ID é obrigatório.' });
    }

    const conexao = await pool.getConnection();

    try {
      const query = 'SELECT usuario FROM usuarios WHERE id = ?';
      const [results] = await conexao.execute(query, [id]);

      if (results.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      res.status(200).json(results[0]);
    } finally {
      conexao.release();
    }
  } catch (error) {
    console.error('Erro inesperado:', error);
    res.status(500).json({ error: 'Erro inesperado no servidor.' });
  }
});




//----------------------------------------------------------------||----------------------------------------------------------------//
//   _____                       
//   |    \      ___     __   _______     _
//   |     |    /   \   |  \     |       / \ 
//   |____/    /     \  |__/     |      /___\
//   |         \     /  | \      |     /     \
//   |          \___/   |  \     |    /       \  
  

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
   /*` SELECT c.id, 
    CASE 
          WHEN c.senha = SHA2('${hash}',256) THEN 'True' 
          ELSE 'False' 
      END AS senha_corresponde
  FROM cadastro c 
  WHERE c.id = (select   c1.id FROM cadastro c1 WHERE c1.login = '${login}')`*/



  
    // Query para pegar apenas os campos nome e email
//     const sql = await pool.query('SELECT nome, url_imagem, telefone, horario_abertura,horario_fechamento, endereco_nome FROM estabelecimentos');
  
//     res.status(200).json(sql.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erro ao buscar dados' });
//   }
// });