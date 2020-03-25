const db = require('../models/index.js');
const randomLocation = require('random-location')
const crypto = require('crypto');
const ServerResponse = require('../helpers/ServerResponse.js');
const moment = require('moment');
const Op = db.Sequelize.Op;

class UsuariosController {

    static DISTANCIA_MINIMA_ALERTA = 50;

    static async cadastrarUsuario(request, response) {
        try {
            const id_aparelho = request.headers['device'];
            const body = request.body;
            body.id_aparelho = id_aparelho;
            body.n = UsuariosController.getNivel(body.s0, body.s1, body.s2, body.s3, body.s4, body.s5, body.s6, body.s7, body.s8, body.s9, body.s10, body.s11);
            const u = await db.usuarios.findOne({ where: { id_aparelho: id_aparelho }});
            if (u) {
                await db.usuarios.update(body, {
                    where: {
                        id_aparelho: id_aparelho,
                    },
                    limit: 1,
                });
                const usuario = await db.usuarios.findOne({ where: { id_aparelho: id_aparelho }});
                ServerResponse.success(response, 'Usuário cadastrado.', [usuario]);
            }
            else {
                const usuario = await db.usuarios.create(body);
                ServerResponse.success(response, 'Usuário cadastrado.', [usuario]);
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao cadastrar usuário. Tente novamente em instantes.');
        }
    }

    static async atualizarSintomas(request, response) {
        try {
            const id_aparelho = request.headers['device'];
            const body = request.body;
            body.n = UsuariosController.getNivel(body.s0, body.s1, body.s2, body.s3, body.s4, body.s5, body.s6, body.s7, body.s8, body.s9, body.s10, body.s11);
            await db.usuarios.update(body, {
                where: {
                    id_aparelho: id_aparelho,
                },
                limit: 1,
            });
            const usuario = await db.usuarios.findOne({ where: { id_aparelho: id_aparelho }, limit: 1});
            ServerResponse.success(response, 'Sintomas atualizados.', [usuario]);
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao atualizar sintomas. Tente novamente em instantes.');
        }
    }

    static async atualizarLocal(request, response) {
        try {
            const id_aparelho = request.headers['device'];
            const body = request.body;
            const lat = body.lat;
            const lon = body.lon;
            await db.usuarios.update(body, {
                where: {
                    id_aparelho: id_aparelho,
                },
                limit: 1,
            });
            //Remover isso-----
            // const latlon = randomLocation.randomCirclePoint({latitude: body.lat, longitude: body.lon}, 2000);
            // body.lat = latlon.latitude;
            // body.lon = latlon.longitude;
            //--------------
            const usuario = await db.usuarios.findOne({ where: { id_aparelho: id_aparelho }});
            if (usuario) {
                body.n = usuario.n;
                body.id_usuario = usuario.id;
                await db.usuarios_locais.create(body);
            }
            if (body.alerta == 'true') { 
                const usuariosProximos = await db.usuarios.findAll({
                    where: db.Sequelize.literal(`id_aparelho != '${id_aparelho}' AND n >= 1 AND ( lat BETWEEN ${lat} - (20.0 / 111.045) AND ${lat} + (20.0 / 111.045) ) AND ( lon BETWEEN ${lon} - (20.0 / (111.045 * COS(RADIANS(${lat})))) AND ${lon} + (20.0 / (111.045 * COS(RADIANS(${lat})))) ) AND ST_DISTANCE_SPHERE(POINT(lon, lat), POINT(${lon}, ${lat})) <= ${this.DISTANCIA_MINIMA_ALERTA} )`),
                    limit: 50,
                    attributes: ['id_aparelho'],
                });
                ServerResponse.success(response, 'Local atualizado.', usuariosProximos);
                return;
            }
            ServerResponse.success(response, 'Local atualizado.', []);
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao atualizar sintomas. Tente novamente em instantes.');
        }
    }

    static async obterHeadMap(request, response) {
        try {
            const id_aparelho = request.headers['device'];
            const usuario = await db.usuarios.findOne({ where: { id_aparelho: id_aparelho }});
            const sistema = await db.sistema.findOne({ where: { uf: usuario.uf }});
            if (usuario) {
                const usuarios = await db.usuarios.findAll({
                    where: {
                        n: { [Op.gte]: sistema.nivel_minimo }
                    },
                    attributes: ['lat', 'lon'],
                });
                ServerResponse.success(response, usuarios.length > 0 ? 'Heat Map obtido.' : 'Nenhuma usuário cadastrado.', usuarios);
                return;
            }    
            ServerResponse.error(response, 'Acesso negado.');
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao obter Heat Map. Tente novamente em instantes.');
        }
    }

    static async listarUsuarios(request, response) {
        try {
            const id_aparelho = request.headers['device'];
            const lat = request.params.lat;
            const lon = request.params.lon;
            const distance = request.params.distance;
            const usuario = await db.usuarios.findOne({ where: { id_aparelho: id_aparelho }});
            const sistema = await db.sistema.findOne({ where: { uf: usuario.uf }});
            if (usuario) {
                const usuarios = await db.usuarios.findAll({
                    where: db.Sequelize.literal(`n >= ${sistema.nivel_minimo} AND ( lat BETWEEN ${lat} - (20.0 / 111.045) AND ${lat} + (20.0 / 111.045) ) AND ( lon BETWEEN ${lon} - (20.0 / (111.045 * COS(RADIANS(${lat})))) AND ${lon} + (20.0 / (111.045 * COS(RADIANS(${lat})))) ) AND ST_DISTANCE_SPHERE(POINT(lon, lat), POINT(${lon}, ${lat})) <= ${distance}`),
                    attributes: ['id', 'n', 's0', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 'lat', 'lon', 'p'],
                });
                ServerResponse.success(response, usuarios.length > 0 ? 'Usuários obtidos.' : 'Nenhuma usuário cadastrado.', usuarios);
                return;
            }    
            ServerResponse.error(response, 'Acesso negado.');
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao listar usuários. Tente novamente em instantes.');
        }
    }

    static async obterPerfil(request, response) {
        try {
            const id = request.params.id;
            const usuario = await db.usuarios.findOne({
                where: { id: id },
                include: [
                    { 
                        model: db.usuarios_locais, 
                        required: false,
                        where: {
                            updated_at: { [Op.gte]: moment().subtract(2, 'days').toDate() } // Últimas 48h
                        },
                        as: 'locais', 
                        order: [['updatedAt', 'DESC']],
                        limit: 2500,
                    },
                ]
            });
            if (usuario) {
                if (usuario.locais.length == 0) {
                    ServerResponse.error(response, 'O usuário não apresentou deslocamento nas últimas 48h.');    
                }
                else {
                    ServerResponse.success(response, 'Deslocamento obtido.', [usuario]);
                }
            }
            else {
                ServerResponse.error(response, 'O usuário solicitado parece não estar mais disponível no sistema.');    
            }
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao obter informações do usuário. Tente novamente em instantes.');
        }
    }

    static async obterEstatisticas(request, response) {
        try {
            const estatisticas = await db.sistema_estatisticas.findAll({ order: [['updatedAt', 'DESC']], limit: 1, });
            ServerResponse.success(response, 'Estatísticas obtidas.', estatisticas);
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao obter estatísticas do sistema. Tente novamente em instantes.');
        }
    }

    static async excluirUsuario(request, response) {
        try {
            const id_aparelho = request.headers['device'];
            const usuario = await db.usuarios.findOne({ where: { id_aparelho: id_aparelho }});
            if (usuario) {
                usuario.destroy({ paranoid: false });
                ServerResponse.success(response, 'Usuário excluído');
                return;
            }
            ServerResponse.error(response, 'Acesso negado.');
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao listar usuários. Tente novamente em instantes.');
        }
    }

    static getNivel(s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11) {
        var count = 0;
        if (s0 == 'true') count++;
        if (s1 == 'true') count++;
        if (s2 == 'true') count++;
        if (s3 == 'true') count++;
        if (s4 == 'true') count++;
        if (s5 == 'true') count++;
        if (s6 == 'true') count++;
        if (s7 == 'true') count++;
        if (s8 == 'true') count++;
        if (s9 == 'true') count++;
        if (s10 == 'true') count++;
        if (s11 == 'true') count++;

        if (count > 3 && (s10 == 'true' || s0 == 'true' || s11 == 'true')) return 2;
        else if (count > 3) return  1;
        else if (count > 2 && s3 == 'true') return 1;
        else return 0;
    }

    static async seedLocal(request, response) {
        try {
            const id = '328a691d-99ff-4057-b410-3e7f8bf3631b';
            var latitude = -5.2144;
            var longitude = -37.3096;
            for (var i = 0; i < 300; i++) {
                latitude += (Math.random() - 0.5) / 1000;
                longitude += (Math.random() - 0.5) / 1000;
                const local = {
                    id_usuario: id,
                    n: 2,
                    lat: latitude,
                    lon: longitude,
                };
                await db.usuarios_locais.create(local);
            }
            ServerResponse.success(response, 'OK.');
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao realizar seed. Tente novamente em instantes.');
        }
    }

    static async seed(request, response) {
        try {
            const qnt = request.params.qnt;
            const raio = request.params.raio;
            const lat = request.params.lat;
            const lon = request.params.lon;
            for (var i = 0; i < qnt; i++) {
                const latlon = randomLocation.randomCirclePoint({latitude: lat, longitude: lon}, raio);
                const s0 = Math.random() > 0.7 ? 'true' : 'false';
                const s1 = Math.random() > 0.65 ? 'true' : 'false';
                const s2 = Math.random() > 0.6 ? 'true' : 'false';
                const s3 = Math.random() > 0.55 ? 'true' : 'false';
                const s4 = Math.random() > 0.5 ? 'true' : 'false';
                const s5 = Math.random() > 0.45 ? 'true' : 'false';
                const s6 = Math.random() > 0.4 ? 'true' : 'false';
                const s7 = Math.random() > 0.34 ? 'true' : 'false';
                const s8 = Math.random() > 0.3 ? 'true' : 'false';
                const s9 = Math.random() > 0.23 ? 'true' : 'false';
                const s10 = Math.random() > 0.8 ? 'true' : 'false';
                const s11 = Math.random() > 0.8 ? 'true' : 'false';
                const n = UsuariosController.getNivel(s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11);
                const pessoa = {
                    id_aparelho: crypto.randomBytes(20).toString('hex'),
                    s0: s0,
                    s1: s1,
                    s2: s2,
                    s3: s3,
                    s4: s4,
                    s5: s5,
                    s6: s6,
                    s7: s7,
                    s8: s8,
                    s9: s9,
                    s10: s10,
                    s11: s11,
                    n: n,
                    lat: latlon.latitude,
                    lon: latlon.longitude,
                    p: 20.0,
                    uf: 'Rio Grande do Norte',
                };
                await db.usuarios.create(pessoa);
            }
            ServerResponse.success(response, 'OK.');
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao realizar seed. Tente novamente em instantes.');
        }
    }
}

module.exports = UsuariosController;
