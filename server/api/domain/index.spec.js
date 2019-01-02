/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var domainCtrlStub = {
  index: 'domainCtrl.index',
  show: 'domainCtrl.show',
  create: 'domainCtrl.create',
  upsert: 'domainCtrl.upsert',
  patch: 'domainCtrl.patch',
  destroy: 'domainCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var domainIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './domain.controller': domainCtrlStub
});

describe('Domain API Router:', function() {
  it('should return an express router instance', function() {
    expect(domainIndex).to.equal(routerStub);
  });

  describe('GET /api/domains', function() {
    it('should route to domain.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'domainCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/domains/:id', function() {
    it('should route to domain.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'domainCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/domains', function() {
    it('should route to domain.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'domainCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/domains/:id', function() {
    it('should route to domain.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'domainCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/domains/:id', function() {
    it('should route to domain.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'domainCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/domains/:id', function() {
    it('should route to domain.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'domainCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
