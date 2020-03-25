const express = require('express');
const SistemaController = require('../controllers/SistemaController.js');
const sistemaRouter = express.Router();

sistemaRouter.get('/info/:uf', SistemaController.info);

module.exports = sistemaRouter;