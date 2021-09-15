const { expect } = require("chai")
const session = require("supertest-session")
const app = require("../../src/app")
const { conn } = require("../../src/db")

const agent = session(app);

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos", err)
    })
  )

  describe('/countries', function() {
    it('GET responde con un status 200', function(){
      return agent
        .get('/countries')
        .expect(function(res){
          expect(res.status).equal(200)}).timeout(8000);
    });
  })
  describe('/countries?name=', function() {
    it('GET responde con status 200 si encuentra un country', function() {
      return agent 
        .get('/countries?name=brazil') 
        .expect(function(res){
          expect(res.status).equal(200)}).timeout(8000);
    });
  })
  describe('/countries/:id', function() {
    it('GET responde con status 200 si encuentra un country por id',  function() {
      return agent 
        .get('/countries/ARG') 
        .expect(function(res){
          expect(res.status).equal(200)}).timeout(8000);
    })
  })
});