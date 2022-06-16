'use strict';

const express = require('express');
const { AnimalsSchema } = require('../models');

const router = express.Router();

// CREATE Animal
router.post('/animals', async(req, res, next) => {
  let animals = req.body;

  //query to the database
  let response = await AnimalsSchema.create(animals);
  res.status(200).send(response);
});

// READ Animal
router.get('/animals', async (req, res, next) => {
  let response = await AnimalsSchema.findAll();
  response.status(200).send(response);
});

// READ 1 animal




// UPDATE Animal
router.put('/animals', async (req, res, next) => {
  let updatedAnimals = await AnimalsSchema.update({
    animalType: updatedAnimals.body.animalType,
    classification: updatedAnimals.body.classification,
    numberLegs: updatedAnimals.body.numberLegs,
  }, {
    where: {
      animalType: null,
      classification: null,
      numberLegs: null,
    },
  });
  res.status(200).send(updatedAnimals);
});

// DELETE Animal
router.delete('/animals', async (req, res, next) => {
  let deletedAnimal = await AnimalsSchema.destroy({
    truncate: true,
  });
  res.status(200).send(deletedAnimal);
});
module.exports = router;