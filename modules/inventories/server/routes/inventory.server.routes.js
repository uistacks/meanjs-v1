'use strict';

/**
 * Module dependencies
 */
var inventoriesPolicy = require('../policies/inventories.server.policy'),
  inventories = require('../controllers/inventories.server.controller');

module.exports = function (app) {
  // Inventories collection routes
  app.route('/api/inventories').all(inventoriesPolicy.isAllowed)
    .get(inventories.list)
    .post(inventories.create);

  // Single inventory routes
  app.route('/api/inventories/:inventoryId').all(inventoriesPolicy.isAllowed)
    .get(inventories.read)
    .put(inventories.update)
    .delete(inventories.delete);


  app.route('/api/inventory/get-tech-inventories')
    .post(inventories.getTechInventories);

  // Finish by binding the inventory middleware
  app.param('inventoryId', inventories.inventoryByID);
};
