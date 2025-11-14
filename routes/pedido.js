const express = require('express');
const router = express.Router();
const pedidoController = require('../app/controllers/pedido');
const verificar = require('../middlewares/auth')

router.get('/', verificar.verificarToken ,  pedidoController.indexPedido);
router.get('/:id', pedidoController.showPedido);
router.post('/', pedidoController.postPedido);
router.put('/:id', pedidoController.updatePedido);
router.delete('/:id', pedidoController.destroyPedido);
module.exports = router;