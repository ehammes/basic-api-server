'use strict';

const express = require('express');
const { PetsSchema } = require('../models');

const router = express.Router();

// CREATE Pet
router.post('/pets', async (req, res, next) => {
  let pets = req.body;

  //query to the database
  let response = await PetsSchema.create(pets);
  res.status(200).send(response);
});

// READ all Pets
router.get('/pets', async (req, res, next) => {
  let response = await PetsSchema.findAll();
  response.status(200).send(response);
});

// READ 1 pet





// UPDATE Pet
router.put('/pets', async (req, res, next) => {
  let updatedPets = await PetsSchema.update({
    name: updatedPets.body.name,
    animalType: updatedPets.body.animalType,
    breed: updatedPets.body.breed,
    age: updatedPets.body.age,
  }, {
    where: {
      name: null,
      animalType: null,
      breed: null,
      age: null,
    },
  });
  res.status(200).send(updatedPets);
});

// DELETE Pet
router.delete('/pets', async (req, res, next) => {
  let deletedPet = await PetsSchema.destroy({
    truncate: true,
  });
  res.status(200).send(deletedPet);
});

module.exports = router;