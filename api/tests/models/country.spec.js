const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model testing', () => {
  
   before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    })); 
  
    describe('Country model', function () {
      beforeEach(async function() {
        await Country.sync({ force: true });
      });
    });
    
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('country', () => {

      it('should throw an error if id is null', (done) => {
        Country.create({
          name: 'Brazil',
          flagImg: 'jpg',
          continent: 'Americas',
          capital: 'Brasilia',

        })
          .then(() => done(new Error('It requires an id')))
          .catch(() => done());
      });

      it('should throw an error if name is null', (done) => {
        Country.create({
          id: 'BRA',
          flagImg: 'jpg',
          continent: 'Americas',
          capital: 'Brasilia',

        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should throw an error if flagImg is null', (done) => {
        Country.create({
          name: 'Brazil',
          id: 'BRA',
          continent: 'Americas',
          capital: 'Brasilia',

        })
          .then(() => done(new Error('It requires a flagImg')))
          .catch(() => done());
      });

      it('should work when it recibes all the necessary fields', () => {
        Country.create({ name: 'Brazil',
                         id: 'BRA', 
                         flagImg: 'jpg',
                         continent: 'Americas',
                         capital: 'Brasilia' })
        .then(() => done(new Error('It requires all the "allownull false" fields')))
        .catch(() => done());
      });

      it('should not work when it does not recibe all the necessary fields', function(done) {
         Country.create({
         name: 'Uruguay',
        })
         .then(() => done('It requires all the "allownull false" fields'))
         .catch(() => done());
     });
    });
  });
});



/* const { Dog, Temperament, conn } = require("../../src/db")
const { expect } = require('chai');

describe('Model Testing', function() {
 
  describe('Dog model', function () {
    beforeEach(async function() {
      await Dog.sync({ force: true });
    });
    describe('Validations', function () {
      it('No deberia crearse si no recibe todos los datos', function(done) {
         Dog.create({
          name: 'Koda',
         })
          .then(() => done('No se creó'))
          .catch(() => done());
      });
    });
  })
  describe('Temperament model', function () {
    beforeEach(async function() {
      await Temperament.sync({ force: true });
    });
    it('No debería crearlo si no recibe un name', (done) => {
      Temperament.create({id: "122333434"})
        .then(() => done(new Error('La propiedad name es obligatoria')))
        .catch(() => done());
    });
    it('Name deberia ser un STRING', function(){
      expect(typeof Temperament.name).equal("string")
    })
    });
}) */