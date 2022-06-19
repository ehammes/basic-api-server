'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const petsSchema = require('./pets');
const animalsSchema = require('./animals');
require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'postgres://localhost:5432/401d47-api-server';

// Connection to Database
const sequelize = new Sequelize(DATABASE_URL)

// // Connection to Database
// const sequelize = new Sequelize(DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// Create Pet Model
const PetsSchema = petsSchema(sequelize, DataTypes);

// Create Animal Model
const AnimalsSchema = animalsSchema(sequelize, DataTypes);

module.exports = {
  sequelize, 
  PetsSchema,
  AnimalsSchema,
};
