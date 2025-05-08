const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { error } = require('console')

// iniciar o app Express
const app = express()

//configura CORS e body parser
app.use(cors())
app.use(bodyParser.json())

const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://usuario:senha@localhost:5432/nome_do_banco',
    ssl: false  // tenta sem SSL explicitamente
});

client.connect()
    .then(() => {
        console.log('✅ Conectado ao banco de Dados PostgreSQL');
    })
    .catch(err => {
        console.error('❌ Erro ao conectar ao PostgreSQL:', err.message);
        console.error(err);
    });


// Rota post para salvar o contato
app.post('/contato', (req, res) => {
    const { nome, email, mensagem } = req.body

    //inserir dados na tabela contatos
    const query = 'INSERT INTO contatos (nome, e,ail, mensagem) VALUES ($1, $2, $3) RETURNING *'
    db.query(query, [nome, email, mensagem], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err)
            return res.status(500).json({ message: 'Erro ao salvar mensagem' })
        }
        res.status(200).json({ message: ' Mensagem enviada com sucesso' })
    })
})

//Iniciar o servidor
app.listen(5000, () => {
    console.log('servidor rodando na porta 5000')
})