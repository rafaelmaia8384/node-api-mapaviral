const uuid = require('uuid/v4');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_aparelho: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        s0: { // Contato com pessoa do exterior nos últimos 14 dias
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s1: { // Febre
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s2: { // Cansaço
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s3: { // Tosse seca
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s4: { // Espirros
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s5: { // Dores no corpo e mal-estar
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s6: { // Coriza ou nariz entupido
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s7: { // Dor de garganta
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s8: { // Diarreia
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s9: { // Dor de cabeça
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s10: { // Falta de ar
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        s11: { // Perda de paladar ou olfato
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        n: { // Nível dos sintomas. Quanto maior, pior
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        lat: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false,
        },
        lon: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
        },
        p: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
        },
        uf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
  }, {
      tableName: 'usuarios',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
      indexes: [
        { fields: ['id_aparelho', 'n', 'lat', 'lon'] },
      ]
  });
  usuarios.associate = function(models) {
    usuarios.hasMany(models.usuarios_locais, {foreignKey: 'id_usuario', as: 'locais'});
  };
  //usuarios.sync();
  return usuarios;
};