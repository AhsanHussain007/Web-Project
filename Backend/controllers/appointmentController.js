const Appointment = require('../models/appointmentSchema.js');
const asynchandler = require("express-async-handler");


exports.create_appointment = asynchandler(async(req, res, next)=>{

    try {
        const appointment = new Appointment(req.body)
        await appointment.save()
        res.status(200).send({appointment});

    } catch (error){    
        res.status(401).send(error)

    }
});
exports.get_appointment = asynchandler(async(req, res, next)=>{

    try {
        const appointments = await Appointment.find()
        res.status(200).send(appointments);

    } catch (error){    
        res.status(401).send(error)

    }
});
exports.delete_appointment = asynchandler(async(req, res, next)=>{

    try {
        const appointments = await Appointment.findByIdAndDelete(req.params.id)
        res.status(200).send(appointments);

    } catch (error){    
        res.status(401).send(error)

    }
});
exports.update_appointment = asynchandler(async (req, res, next) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } 
        );

        if (!updatedAppointment) {
            return res.status(404).send({ message: "Appointment not found" });
        }

        res.status(200).send(updatedAppointment);
    } catch (error) {
        res.status(400).send(error);
    }
});


