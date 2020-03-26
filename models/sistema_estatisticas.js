const uuid = require('uuid/v4');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const sistema_estatisticas = sequelize.define('sistema_estatisticas', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        s0: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s1: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s2: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s3: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s4: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s5: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s6: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s7: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s8: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s9: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s10: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        s11: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        usuarios_totais: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        usuarios_assintomaticos: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        usuarios_contato_exterior: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        numero_cadastro_48h: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        deslocamentos_48h: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        deixou_usar_48h: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        sintomas_agressivos: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
  }, {
      tableName: 'sistema_estatisticas',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  return sistema_estatisticas;
};