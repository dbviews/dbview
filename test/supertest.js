const request = require('supertest');
// Start server
const path = require('path');
const fs = require('fs');
const assert = require('assert');

const app = require('../src/server/server.js');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

const testLogin = {
  host: 'ec2-54-243-212-72.compute-1.amazonaws.com',
  database: 'd7ctrh5hg6aadj',
  user: 'dxrwecviorvrto',
  port: 5432,
  password: 'BDyJHAElIeyxjSLNxI1NBYu3Z4',
  dialect: 'postgres'
}
const testTable = 'users';
let testConnection;

/**
* include an assertion library here so that you can make assertions other than those
* provided by supertest. Choose whichever assertion library suits you.
*/
// const expect = require('expect');
// const expect = require('chai').expect;
// const assert = require('chai').assert;

describe('Route integration', () => {
  //test to get index.html
  describe('/', () => {
    describe('GET', () => {
      it('responds to page load with 200 status and text/html content type', done => {
        request(HOST)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });
  });
  //all tests for data validation and database interactivity are detailed below
  describe('database interaction', () => {
    describe('POST', () => {
      it('sending DB login info responds with list of tables', done => {
         request(HOST)
          .post('/requestDB')
          .send({ creds: testLogin })
          .expect('Content-Type', /application\/json/)
          .end( (err, res) => {
            assert.equal(typeof res.body[0], 'string');
            done();
          });
      });
      it('sending a table name returns that table', done => {
         request(HOST)
          .post('/requestTable')
          .send({ creds: testLogin, table: 'users' })
          .expect('Content-Type', /application\/json/)
          .end( (err, res) => {
            assert.equal(res.body[0].id, 1);
            done();
          });
      });
      //still need column name parameters
      it('creating a table creates a new table in the database', done => {
         request(HOST)
          .post('/createTable')
          .send({ creds: testLogin, table: 'users2', columns: { id: 'serial', name: 'varchar', games: 'integer'} })
          .expect('Content-Type', /application\/json/)
          .end( (err, res) => {
            assert.equal(res.body instanceof Array, true);
            done();
          });
      });
      it('can insert new rows into a table', done => {
         request(HOST)
          .post('/insert')
          .send({ creds: testLogin, table: 'users2', valuesToInsert: { name: 'Clegane', games: '8' }})
          .expect('Content-Type', /application\/json/)
          .end( (err, res) => {
            assert.equal(res.body[0].name, 'Clegane');
            done();
          });
      });
      //go from here
      it('can update a row in a table', done => {
         request(HOST)
          .post('/update')
          .send({ creds: testLogin, table: 'users2', where: `name='Clegane'`, valuesToInsert: {'games': 8 } })
          .expect('Content-Type', /application\/json/)
          .end( (err, res) => {
            assert.equal(res.body[0].games, 8);
            done();
          });
      });
      it('can delete a row in a table', done => {
         request(HOST)
          .post('/delete')
          .send({ creds: testLogin, table: 'users2', where: `name='Clegane'` })
          .expect('Content-Type', /application\/json/)
          .end( (err, res) => {
            console.log(res.body);
            assert.equal(res.body.length, 0);
            done();
          });
      });
    });
  });
});
