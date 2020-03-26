const express = require('express');
const db = require('../models/index.js');
const UsuariosController = require('../controllers/UsuariosController.js');
const ServerResponse = require('../helpers/ServerResponse.js');
const usuariosRouter = express.Router();

const check = (request, response, next) => {
    if (!request.headers['device']) {
        ServerResponse.error(response, 'Acesso negado.');
        return;
    }
    else {
        const usuario = db.usuarios.findOne({ where: { id_aparelho: request.headers['device'] }});
        if (!usuario) {
            ServerResponse.error(response, 'Acesso negado.');
            return;
        }
        next();
    }
};

usuariosRouter.post('/cadastrar', (check), UsuariosController.cadastrarUsuario);
usuariosRouter.post('/atualizar', (check), UsuariosController.atualizarSintomas);
usuariosRouter.post('/atualizarlocal', (check), UsuariosController.atualizarLocal);
usuariosRouter.delete('/excluir', (check), UsuariosController.excluirUsuario);
usuariosRouter.get('/heatmap', (check), UsuariosController.obterHeadMap);
usuariosRouter.get('/listar/:lat/:lon/:distance', (check), UsuariosController.listarUsuarios);
usuariosRouter.get('/perfil/:id', (check), UsuariosController.obterPerfil);
usuariosRouter.get('/estatisticas', (check), UsuariosController.obterEstatisticas);
usuariosRouter.get('/estatisticas/sintomas/:s', (check), UsuariosController.evolucaoSintomas);
usuariosRouter.get('/seed/:qnt/:raio/:lat/:lon', UsuariosController.seed);
usuariosRouter.get('/seedlocais', UsuariosController.seedLocais);

module.exports = usuariosRouter;