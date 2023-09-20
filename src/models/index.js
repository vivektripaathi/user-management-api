const path = require('path');
const glob = require('glob');
const basename = path.basename(__filename);
const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config({path: path.join(__dirname , '../../', '.env')});

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'postgres'
    }
);

const models = {};

glob
    .sync(`${__dirname}/**/*.js`)
    .filter((file) => {
        const fileName = file.split('/');
        return (
            fileName[fileName.length - 1].indexOf('.') !== 0 &&
            fileName[fileName.length - 1] !== basename &&
            fileName[fileName.length - 1].slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const fileName = file.split('/');
        const model = require(file)(sequelize, DataTypes);
        models[fileName[fileName.length - 1].slice(0, -3)] = model;
    });

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;

module.exports = models;
