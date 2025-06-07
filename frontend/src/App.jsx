import React from 'react';
import { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [novo, setNovo] = useState({ nome: '', preco: '' });

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    const res = await api.get('/produtos');
    setProdutos(res.data);
  };

  const adicionarProduto = async () => {
    if (!novo.nome || !novo.preco) return;
    await api.post('/produtos', {
      nome: novo.nome,
      preco: parseFloat(novo.preco),
    });
    setNovo({ nome: '', preco: '' });
    buscarProdutos();
  };

  const removerProduto = async (id) => {
    await api.delete(`/produtos/${id}`);
    buscarProdutos();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Produtos</h1>
      <input
        placeholder="Nome"
        value={novo.nome}
        onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
      />
      <input
        placeholder="Preço"
        type="number"
        value={novo.preco}
        onChange={(e) => setNovo({ ...novo, preco: e.target.value })}
      />
      <button onClick={adicionarProduto}>Adicionar</button>

      <ul>
        {produtos.map((p) => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco}
            <button onClick={() => removerProduto(p.id)} style={{ marginLeft: '1rem' }}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
