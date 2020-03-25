const uuid = require('uuid/v4');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const usuarios_locais = sequelize.define('usuarios_locais', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        id_usuario: { //foreign key
            type: DataTypes.UUID,
            allowNull: false,
        },
        n: { // Nível dos sintomas
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
  }, {
      tableName: 'usuarios_locais',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
      indexes: [
        { fields: ['id_usuario', 'lat', 'lon'] },
      ]
  });
  usuarios_locais.associate = function(models) {
    usuarios_locais.belongsTo(models.usuarios, {foreignKey: 'id_usuario'});
  };
  //usuarios_locais.sync();
  return usuarios_locais;
};