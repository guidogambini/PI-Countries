const { Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model testing', () => {
  
   before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    })); 
  
    describe('Activity model', function () {
      beforeEach(async function() {
        await Activity.sync(/* { force: true } */);
      });
    });
    
  describe('Validators', () => {
    beforeEach(() => Activity.sync(/* { force: true } */));
    describe('activity', () => {

      it('should throw an error if difficulty is not between 1 and 5', (done) => {
        Activity.create({
          name: 'judo',
          difficulty: 8,
          duration: '3hs',
          season: 'summer',

        })
          .then(() => done(new Error('It requires a difficulty between 1 and 5')))
          .catch(() => done());
      });

      it('should work when it recibes all the fields correctly', () => {
        Activity.create({ name: 'football',
                         difficulty: 2, 
                         duration: '1hr'
                        })
        .then(() => done(new Error('It requires all the fields')))
        .catch(() => done());
      });

      it('should not work when it does not recibe an specified season', function(done) {
         Activity.create({
         name: 'trekking',
         season: 'verano'
        })
         .then(() => done('It requires one of the four specified seasons'))
         .catch(() => done());
     });
    });
  });
});