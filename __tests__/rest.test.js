'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const { sequelize } = require('../src/models');
const mockRequest = supertest(server);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

// pet
describe('Testing REST API', () => {

  test('Create a pet', async () => {
    let response = await mockRequest.post('/pets').send({
      name: 'test',
      breed: 'labrador',
      age: 4,
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.breed).toEqual('labrador');
    expect(response.body.age).toEqual(4);
  });
  test('Should read from pet', () => {
    expect(true).toBe(false);
  });

  test('Should update a pet', () => {
    expect(true).toBe(false);
  });

  test('Should delete a pet', () => {
    expect(true).toBe(false);
  });
});

// Animal
describe('Testing REST API', () => {

  test('Create an animal', async () => {
    let response = await mockRequest.post('/animals').send({
      animalType: 'Cheetah',
      classification: 'Mammal',
      numberLegs: 4,
    });

    expect(response.status).toEqual(200);
    expect(response.body.animalType).toEqual('Cheetah');
    expect(response.body.classification).toEqual('Mammal');
    expect(response.body.numberLegs).toEqual(4);
  });
  test('Should read from animals', () => {
    expect(true).toBe(false);
  });

  test('Should update an animal', () => {
    expect(true).toBe(false);
  });

  test('Should delete an animal', () => {
    expect(true).toBe(false);
  });
});