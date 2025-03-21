const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let produtos = [
    { id: 1, nome: 'Mouse' },
    { id: 2, nome: 'Fone' },
    { id: 3, nome: 'Teclado' }
];

app.get('/', (req, res) => {
    res.send('API de Produtos está rodando!');
});

// Listar todos os produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// Adicionar um novo produto
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    
    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ error: 'Nome é obrigatório e deve ser uma string válida' });
    }

    const precoConvertido = parseFloat(preco);
    if (isNaN(precoConvertido) || precoConvertido < 0) {
        return res.status(400).json({ error: 'Preço deve ser um número válido e não negativo' });
    }

    const novoProduto = { id: id++, nome, preco: precoConvertido };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// Atualizar um produto específico
app.put('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const { nome, preco } = req.body;

    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ error: 'Nome é obrigatório e deve ser uma string válida' });
    }

    const precoConvertido = parseFloat(preco);
    if (isNaN(precoConvertido) || precoConvertido < 0) {
        return res.status(400).json({ error: 'Preço deve ser um número válido e não negativo' });
    }

    produto.nome = nome;
    produto.preco = precoConvertido;
    res.json(produto);
});

// Remover um produto específico
app.delete('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);

    const index = produtos.findIndex(p => p.id === produtoId);
    if (index === -1) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    produtos.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
