    const express = require('express');
    const router = express.Router();
    const token = require('../middlewares/auth');
    const empleadoController = require('../app/controllers/empleado');
    const auth = require('../app/controllers/auth');

    // Rutas de autenticación primero (fijas)
    router.post('/login', auth.loginEmpleado);
    router.post('/logout', auth.logoutCliente);
    router.get('/profile',  token.verificarToken  ,empleadoController.profileEmpleado);

    // Rutas CRUD de empleados
    router.get('/', empleadoController.indexEmpleado);
    router.get('/:id', empleadoController.showEmpleado);
    router.post('/', empleadoController.postEmpleado);
    router.put('/:id', empleadoController.updateEmpleado);
    router.delete('/:id', empleadoController.destroyEmpleado);

    module.exports = router;
