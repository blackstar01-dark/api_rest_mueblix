const express = require('express');
const router = express.Router();
const pedidoController = require('../app/controllers/pedido');
const verificar = require('../middlewares/auth');

// Rutas protegidas con JWT
router.get('/', verificar.verificarToken, pedidoController.indexPedido);
router.get('/:id', verificar.verificarToken, pedidoController.showPedido);
router.post('/', verificar.verificarToken, pedidoController.postPedido);
router.put('/:id', verificar.verificarToken, pedidoController.updatePedido);
router.delete('/:id', verificar.verificarToken, pedidoController.destroyPedido);

module.exports = router;