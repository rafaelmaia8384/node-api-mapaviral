const sistemaRouter = require('./routes.sistema.js');
const usuariosRouter = require('./routes.usuarios.js');
const UsuariosController = require('../controllers/UsuariosController.js');
const env = process.env.NODE_ENV;

/** Aqui declaramos nossas rotas */
const router = (app) => {
    // Rotas
    app.use('/api/v1/sistema', sistemaRouter);
    app.use('/api/v1/usuarios', usuariosRouter);
};

module.exports  = router;