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
  let allPets = await PetsSchema.findAll();
  res.status(200).send(allPets);
});

// READ 1 pet
router.get('/pets/:id', async (req, res, next) => {
  let { id } = req.params;
  let onePet = await PetsSchema.findOne({where: {id: id}});
  res.status(200).send(onePet);
});


// UPDATE Pet
router.put('/pets/:id', async (req, res, next) => {
  let { id } = req.params;
  await PetsSchema.update(req.body, {where: { id }});
  let updatePets = await PetsSchema.findOne({where: { id }});
  res.status(200).send(updatePets);
});

// DELETE Pet
router.delete('/pets/:id', async (req, res, next) => {
  let { id } = req.params;
  let deletedPet = await PetsSchema.findOne({where: { id }});
  await PetsSchema.destroy({where: { id }});
  res.status(200).send(deletedPet);
});

module.exports = router;