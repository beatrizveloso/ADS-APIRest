const express = require('express');
const app = express();

const port = 3000; // Correção da declaração

// Middleware para permitir JSON no body das requisições
app.use(express.json());

// Lista de usuários simulada
let usuarios = [
    { id: 1, nome: 'Ana' },
    { id: 2, nome: 'Carlos' },
    { id: 3, nome: 'Beatriz' }
];

// Rota principal
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Usuários!');
});

// Rota para obter todos os usuários
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Rota para obter um usuário pelo ID
app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send({ mensagem: 'Usuário não encontrado' });
    }
});

// Rota para adicionar um novo usuário
app.post('/usuarios', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).send({ mensagem: 'Nome é obrigatório' }); // Status 400 para erro de requisição
    }

    const novoUsuario = {
        id: usuarios.length + 1,
        nome
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

// Rota para atualizar um usuário pelo ID
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).send({ mensagem: 'Usuário não encontrado' });
    }

    const { nome } = req.body;

    if (!nome) {
        return res.status(400).send({ mensagem: 'Nome é obrigatório' });
    }

    usuario.nome = nome;
    res.json(usuario);
});

// Rota para excluir um usuário pelo ID
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).send({ mensagem: 'Usuário não encontrado' });
    }

    usuarios.splice(index, 1);
    res.status(204).send();
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
