const express = require('express');
const router = express.Router();
const productoController = require('../app/controllers/producto');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/img/producto/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
})
const upload = multer({ storage: storage });

// Obtener todos los productos
router.get('/', productoController.indexProducto);

// Rutas específicas primero
router.get('/precio-mayor', productoController.getProductoPorPrecioMayor);
router.get('/precio-menor', productoController.getProductoPorPrecioMenor);
router.get('/:id/categoria', productoController.getProductosPorCategoria);

// Ruta genérica (siempre al final)
router.get('/:id', productoController.showProducto);

// Crear, actualizar, eliminar
router.post('/', upload.single('imagen'), productoController.postProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.destroyProducto);

module.exports = router;
