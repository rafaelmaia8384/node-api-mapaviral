'use strict';

const JOB_MIN_TIME_MINUTES = 1;

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const cron = require('node-cron');
const moment = require('moment');
const exec = require('child_process').exec;
const config = require('../config/config.js');
const basename = path.basename(__filename);
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Criar tabelas se não existirem
sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log();

//Cron job para estatísticas e HeatMap
cron.schedule(`0 */${JOB_MIN_TIME_MINUTES} * * * *`, async () => {
    const Op = db.Sequelize.Op;
    const usuariosTotais = await db.usuarios.count({ col: 'id' });
    const usuariosAssintomaticos = await db.usuarios.count({ col: 'id', where: { s1: false, s2: false, s3: false, s4: false, s5: false, s6: false, s7: false, s8: false, s9: false, s10: false, s11: false, }});
    const usuariosTiveramContato = await db.usuarios.count({ col: 'id', where: { s0: true, }});
    const usuariosCadastros48h = await db.usuarios.count({ col: 'id', where: { created_at: { [Op.gte]: moment().subtract(2, 'days').toDate() }}});
    const usuariosDeslocamento48h = await db.usuarios_locais.count({ col: 'id', where: { updated_at: { [Op.gte]: moment().subtract(2, 'days').toDate() }}});
    const usuariosDeletado48h = await db.usuarios.count({ col: 'id', paranoid: false, where: { deleted_at: { [Op.gte]: moment().subtract(2, 'days').toDate() }}});
    const usuariosSintomasAgressivos = await db.usuarios.count({ col: 'id', where: { s1: true, s3: true, s10: true }});
    const s0 = await db.usuarios.count({ col: 's0', where: { s0: true }});
    const s1 = await db.usuarios.count({ col: 's1', where: { s1: true }});
    const s2 = await db.usuarios.count({ col: 's2', where: { s2: true }});
    const s3 = await db.usuarios.count({ col: 's3', where: { s3: true }});
    const s4 = await db.usuarios.count({ col: 's4', where: { s4: true }});
    const s5 = await db.usuarios.count({ col: 's5', where: { s5: true }});
    const s6 = await db.usuarios.count({ col: 's6', where: { s6: true }});
    const s7 = await db.usuarios.count({ col: 's7', where: { s7: true }});
    const s8 = await db.usuarios.count({ col: 's8', where: { s8: true }});
    const s9 = await db.usuarios.count({ col: 's9', where: { s9: true }});
    const s10 = await db.usuarios.count({ col: 's10', where: { s10: true }});
    const s11 = await db.usuarios.count({ col: 's11', where: { s11: true }});
    await db.sistema_estatisticas.create({
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
        usuarios_totais: usuariosTotais,
        usuarios_assintomaticos: usuariosAssintomaticos,
        usuarios_contato_exterior: usuariosTiveramContato,
        numero_cadastro_48h: usuariosCadastros48h,
        deslocamentos_48h: usuariosDeslocamento48h,
        deixou_usar_48h: usuariosDeletado48h,
        sintomas_agressivos: usuariosSintomasAgressivos,
    });
    exec(`mysql -u ${config.username} -p${config.password} -D ${config.database} -e "SELECT lat, lon FROM usuarios;" > ${path.resolve(__dirname + '/../data/heatmap.csv')}`);
}).start();

module.exports = db;
