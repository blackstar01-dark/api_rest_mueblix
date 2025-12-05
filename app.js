const express = require('express');
const db = require('./database/config');
const PORT = process.env.PORT || 3000;
const usuarioRouter = require('./routes/usuario');
const productoRouter = require('./routes/producto');
const pedidoRouter = require('./routes/pedido');
const empleadoRouter = require('./routes/empleado');
const sensorRouter = require('./routes/sensor');
const categoriaRouter = require('./routes/categoria');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*' 
}));


app.use('/img/producto', express.static(path.join(__dirname, 'public/img/producto')));

app.use('/usuario', usuarioRouter);

app.use('/producto', productoRouter);

app.use('/pedido', pedidoRouter);

app.use('/sensor', sensorRouter);

app.use('/empleado', empleadoRouter);

app.use('/categoria', categoriaRouter);

db();

app.get('/', (req, res) => {
  res.send('API REST con MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});