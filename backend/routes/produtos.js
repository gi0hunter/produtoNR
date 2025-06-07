const express = require('express');
const router = express.Router();

let produtos = [
  { id: 1, nome: 'Notebook', preco: 2500 },
  { id: 2, nome: 'Mouse', preco: 150 }
];

// GET todos os produtos
router.get('/', (req, res) => {
  res.json(produtos);
});

// GET um produto por ID
router.get('/:id', (req, res) => {
  const produto = produtos.find(p => p.id == req.params.id);
  if (produto) res.json(produto);
  else res.status(404).json({ erro: 'Produto não encontrado' });
});

// POST novo produto
router.post('/', (req, res) => {
  const novo = { id: Date.now(), ...req.body };
  produtos.push(novo);
  res.status(201).json(novo);
});

// PUT atualizar produto
router.put('/:id', (req, res) => {
  const index = produtos.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    produtos[index] = { id: produtos[index].id, ...req.body };
    res.json(produtos[index]);
  } else {
    res.status(404).json({ erro: 'Produto não encontrado' });
  }
});

// DELETE produto
router.delete('/:id', (req, res) => {
  produtos = produtos.filter(p => p.id != req.params.id);
  res.status(204).send();
});

module.exports = router;
