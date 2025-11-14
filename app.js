const express = require('express');
const db = require('./database/config');
const PORT = process.env.PORT || 3000;
const usuarioRouter = require('./routes/usuario');
const productoRouter = require('./routes/producto');
const pedidoRouter = require('./routes/pedido');
const sensorRouter = require('./routes/sensor');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors(

));

app.use('/usuario', usuarioRouter);

app.use('/producto', productoRouter);

app.use('/pedido', pedidoRouter);

app.use('/sensor', sensorRouter);

db();

app.get('/', (req, res) => {
  res.send('API REST con MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});