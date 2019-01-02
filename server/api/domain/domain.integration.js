/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newDomain;

describe('Domain API:', function() {
  describe('GET /api/domains', function() {
    var domains;

    beforeEach(function(done) {
      request(app)
        .get('/api/domains')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          domains = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(domains).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/domains', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/domains')
        .send({
          name: 'New Domain',
          info: 'This is the brand new domain!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDomain = res.body;
          done();
        });
    });

    it('should respond with the newly created domain', function() {
      expect(newDomain.name).to.equal('New Domain');
      expect(newDomain.info).to.equal('This is the brand new domain!!!');
    });
  });

  describe('GET /api/domains/:id', function() {
    var domain;

    beforeEach(function(done) {
      request(app)
        .get(`/api/domains/${newDomain._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          domain = res.body;
          done();
        });
    });

    afterEach(function() {
      domain = {};
    });

    it('should respond with the requested domain', function() {
      expect(domain.name).to.equal('New Domain');
      expect(domain.info).to.equal('This is the brand new domain!!!');
    });
  });

  describe('PUT /api/domains/:id', function() {
    var updatedDomain;

    beforeEach(function(done) {
      request(app)
        .put(`/api/domains/${newDomain._id}`)
        .send({
          name: 'Updated Domain',
          info: 'This is the updated domain!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDomain = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDomain = {};
    });

    it('should respond with the updated domain', function() {
      expect(updatedDomain.name).to.equal('Updated Domain');
      expect(updatedDomain.info).to.equal('This is the updated domain!!!');
    });

    it('should respond with the updated domain on a subsequent GET', function(done) {
      request(app)
        .get(`/api/domains/${newDomain._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let domain = res.body;

          expect(domain.name).to.equal('Updated Domain');
          expect(domain.info).to.equal('This is the updated domain!!!');

          done();
        });
    });
  });

  describe('PATCH /api/domains/:id', function() {
    var patchedDomain;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/domains/${newDomain._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Domain' },
          { op: 'replace', path: '/info', value: 'This is the patched domain!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDomain = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDomain = {};
    });

    it('should respond with the patched domain', function() {
      expect(patchedDomain.name).to.equal('Patched Domain');
      expect(patchedDomain.info).to.equal('This is the patched domain!!!');
    });
  });

  describe('DELETE /api/domains/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/domains/${newDomain._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when domain does not exist', function(done) {
      request(app)
        .delete(`/api/domains/${newDomain._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
