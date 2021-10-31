const express = require('express');
const router = express.Router();

const controller = require('./../controllers/donationController')
const salesforce = require('./../middlewares/salesforce')

router.post('/donations', salesforce ,controller.post);

module.exports = router;