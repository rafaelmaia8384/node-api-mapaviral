const uuid = require('uuid/v4');

'use strict';

module.exports = (sequelize, DataTypes) => {
  const sistema = sequelize.define('sistema', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        uf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        autorizado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        base_url: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        nivel_minimo: { // Nivel mínimo para se mostrar
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
        zoom: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
        },
  }, {
      tableName: 'sistema',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
  });
  sistema.sync({ force: true }).then(() => {
    sistema.create({ uf: 'Acre', autorizado: false, base_url: null, nivel_minimo: 0, lat: -9.126372, lon: -70.325451, zoom: 6.0 });
    sistema.create({ uf: 'Alagoas', autorizado: false, base_url: null, nivel_minimo: 0, lat: -9.812661, lon: -36.564301, zoom: 7.0});
    sistema.create({ uf: 'Amapá', autorizado: false, base_url: null, nivel_minimo: 0 , lat: 1.603451, lon: -51.684379, zoom: 6.0});
    sistema.create({ uf: 'Amazonas', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -4.192781, lon: -64.862630, zoom: 5.0});
    sistema.create({ uf: 'Bahia', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -12.877599, lon: -41.390566, zoom: 6.0});
    sistema.create({ uf: 'Ceará', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -5.329985, lon: -39.465170, zoom: 7.0});
    sistema.create({ uf: 'Distrito Federal', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -15.882789, lon: -47.888483, zoom: 8.0});
    sistema.create({ uf: 'Espírito Santo', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -20.087094, lon: -40.928266, zoom: 7.0});
    sistema.create({ uf: 'Goiás', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -15.957499, lon: -49.892862, zoom: 6.0});
    sistema.create({ uf: 'Maranhão', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -5.043879, lon: -45.039703, zoom: 6.0});
    sistema.create({ uf: 'Mato Grosso', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -13.858978, lon: -56.220173, zoom: 5.0});
    sistema.create({ uf: 'Mato Grosso do Sul', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -20.883506, lon: -54.973177, zoom: 6.0});
    sistema.create({ uf: 'Minas Gerais', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -19.948428, lon: -44.860475, zoom: 6.0});
    sistema.create({ uf: 'Pará', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -4.522954, lon: -53.033088, zoom: 5.0});
    sistema.create({ uf: 'Paraíba', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -7.208310, lon: -36.819505, zoom: 7.0});
    sistema.create({ uf: 'Paraná', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -25.200065, lon: -58.484722, zoom: 6.0});
    sistema.create({ uf: 'Pernambuco', autorizado: false, base_url: null, nivel_minimo: 0 , lat: 9.115869, lon: -37.661743, zoom: 6.0});
    sistema.create({ uf: 'Piauí', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -7.123047, lon: -42.868552, zoom: 6.0});
    sistema.create({ uf: 'Rio de Janeiro', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -23.155123, lon: -43.731843, zoom: 6.0});
    sistema.create({ uf: 'Rio Grande do Norte', autorizado: true, base_url: 'https://10.0.2.2/api/v1/', nivel_minimo: 0 , lat: -5.766534, lon: -36.929554, zoom: 7.0});
    sistema.create({ uf: 'Rio Grande do Sul', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -30.011979, lon: -53.395143, zoom: 6.0});
    sistema.create({ uf: 'Rondônia', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -11.427548, lon: -63.024710, zoom: 6.0});
    sistema.create({ uf: 'Roraima', autorizado: false, base_url: null, nivel_minimo: 0 , lat: 1.292922, lon: -62.020215, zoom: 6.0});
    sistema.create({ uf: 'Santa Catarina', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -27.378543, lon: -51.038096, zoom: 6.0});
    sistema.create({ uf: 'São Paulo', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -22.987423, lon: -49.055359, zoom: 6.0});
    sistema.create({ uf: 'Sergipe', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -10.576300, lon: -37.449705, zoom: 7.0});
    sistema.create({ uf: 'Tocantins', autorizado: false, base_url: null, nivel_minimo: 0 , lat: -10.690748, lon: -48.655211, zoom: 6.0});
  });
  return sistema;
};