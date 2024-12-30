const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js')


router.get('/', appointmentController.get_appointment)
router.post('/create', appointmentController.create_appointment)
router.delete('/delete/:id', appointmentController.delete_appointment)
router.put('/update/:id', appointmentController.update_appointment)

module.exports = router;