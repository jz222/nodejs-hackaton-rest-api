const express = require('express');

// Controllers
const controllers = require('../controllers');

// Middlewares
const middlewares = require('../middlewares/');

// Create router
const router = express.Router();

// Public
router.post('/login', controllers.auth.login);
router.get('/public/hackaton/:id', controllers.hackaton.getOnePublic);
router.post('/hackaton/solution/:id', controllers.hackaton.submitSolution);

router.use(middlewares.isAdmin);

// Protected
router.get('/hackaton/all', controllers.hackaton.getAll);
router.get('/hackaton/:id', controllers.hackaton.getOne);
router.post('/hackaton', controllers.hackaton.create);
router.put('/hackaton/:id', controllers.hackaton.update);
router.delete('/hackaton/:id', controllers.hackaton.remove);

module.exports = router;
