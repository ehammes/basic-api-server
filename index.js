'use strict';

const { sequelize, PetsSchema, AnimalsSchema } = require('./src/models');

sequelize.sync()
  .then(() => {
    console.log('Successful Connection!');
    // PetsSchema.create({name: 'Duke'});
    // AnimalsSchema.create({animalType: 'Elephant'});
  })  
  .catch(error => console.error(error));