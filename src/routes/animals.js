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
  let allAnimals = await AnimalsSchema.findAll();
  res.status(200).send(allAnimals);
});

// READ 1 animal
router.get('/animals/:id', async (req, res, next) => {
  let { id } = req.params;
  let oneAnimal = await AnimalsSchema.findOne({where: {id: id}});
  res.status(200).send(oneAnimal);
});


// UPDATE animal
router.put('/animals/:id', async (req, res, next) => {
  let { id } = req.params;
  await AnimalsSchema.update(req.body, {where: { id }});
  let updateAnimal = await AnimalsSchema.findOne({where: { id }});
  res.status(200).send(updateAnimal);
});

// DELETE animal
router.delete('/animals/:id', async (req, res, next) => {
  let { id } = req.params;
  let deletedAnimal = await AnimalsSchema.findOne({where: { id }});
  await AnimalsSchema.destroy({where: { id }});
  res.status(200).send(deletedAnimal);
});

module.exports = router;