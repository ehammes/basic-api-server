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

let pet1 = {
  name: 'Luna',
  animalType: 'Dog',
  breed: 'Labrador Retriever',
  age: 4,
};

let pet2 = {
  name: 'Baxter',
  animalType: 'Dog',
  breed: 'Boxer',
  age: 5,
};

// pet
describe('Testing REST API', () => {

  test('Create a pet', async () => {
    let response = await mockRequest.post('/pets').send(pet1);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Luna');
    expect(response.body.animalType).toEqual('Dog');
    expect(response.body.breed).toEqual('Labrador Retriever');
    expect(response.body.age).toEqual(4);
  });

  test('Should get all pets', async () => {
    await mockRequest.post('/pets').send(pet2);
    let response = await mockRequest.get('/pets').send(pet1, pet2);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject([pet1, pet2]);
  });

  test('Should get a pet', async () => {
    let response = await mockRequest.get(`/pets/1`);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Luna');
    expect(response.body.animalType).toEqual('Dog');
    expect(response.body.breed).toEqual('Labrador Retriever');
    expect(response.body.age).toEqual(4);
  });

  test('Should update a pet', async () => {
    let response = await mockRequest.put('/pets/1').send(pet2);
    let getPet = await mockRequest.get(`/pets/1`);

    expect(response.status).toEqual(200);
    expect(getPet.body.id).toEqual(1);
    expect(getPet.body.name).toEqual('Baxter');
    expect(getPet.body.animalType).toEqual('Dog');
    expect(getPet.body.breed).toEqual('Boxer');
    expect(getPet.body.age).toEqual(5);
  });

  test('Should delete a pet', async () => {
    let response1 = await mockRequest.delete('/pets/1');
    let response2 = await mockRequest.delete('/pets/2');
    let getPet1 = await mockRequest.get(`/pets/1`);
    let getPet2 = await mockRequest.get(`/pets/2`);


    expect(response1.status).toEqual(200);
    expect(getPet1.body).toEqual({});

    expect(response2.status).toEqual(200);
    expect(getPet2.body).toEqual({});
  });
});

// Animal
let animal1 = {
  animalType: 'Cheetah',
  classification: 'Mammal',
  numberLegs: 4,
};

let animal2 = {
  animalType: 'Turtle',
  classification: 'Reptile',
  numberLegs: 4,
};

// animal
describe('Testing REST API', () => {

  test('Create a animal', async () => {
    let response = await mockRequest.post('/animals').send(animal1);

    expect(response.status).toEqual(200);
    expect(response.body.animalType).toEqual('Cheetah');
    expect(response.body.classification).toEqual('Mammal');
    expect(response.body.numberLegs).toEqual(4);
  });

  test('Should get all animals', async () => {
    await mockRequest.post('/animals').send(animal2);
    let response = await mockRequest.get('/animals').send(animal1, animal2);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject([animal1, animal2]);
  });

  test('Should get an animal', async () => {
    let response = await mockRequest.get(`/animals/1`);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.animalType).toEqual('Cheetah');
    expect(response.body.classification).toEqual('Mammal');
    expect(response.body.numberLegs).toEqual(4);
  });

  test('Should update an animal', async () => {
    let response = await mockRequest.put('/animals/1').send(animal2);
    let getAnimal = await mockRequest.get(`/animals/1`);

    expect(response.status).toEqual(200);
    expect(getAnimal.body.id).toEqual(1);
    expect(response.body.animalType).toEqual('Turtle');
    expect(response.body.classification).toEqual('Reptile');
    expect(response.body.numberLegs).toEqual(4);
  });

  test('Should delete an animal', async () => {
    let response1 = await mockRequest.delete('/animals/1');
    let response2 = await mockRequest.delete('/animals/2');
    let getAnimal1 = await mockRequest.get(`/animals/1`);
    let getAnimal2 = await mockRequest.get(`/animals/2`);


    expect(response1.status).toEqual(200);
    expect(getAnimal1.body).toEqual({});

    expect(response2.status).toEqual(200);
    expect(getAnimal2.body).toEqual({});
  });
});