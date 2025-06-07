const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // permite chamadas do front-end
app.use(express.json()); // permite receber JSON

const produtosRoutes = require('./routes/produtos');
app.use('/api/produtos', produtosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
