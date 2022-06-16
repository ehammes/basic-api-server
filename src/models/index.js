'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const petsSchema = require('./pets');
const animalsSchema = require('./animals');
// require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'postgres://localhost:5432/d401d47-api-app';

// Connection to Database
const sequelize = new Sequelize(DATABASE_URL);

// Create Pet Model
const PetsSchema = petsSchema(sequelize, DataTypes);

// Create Animal Model
const AnimalsSchema = animalsSchema(sequelize, DataTypes);

module.exports = {
  sequelize, 
  PetsSchema,
  AnimalsSchema,
};
