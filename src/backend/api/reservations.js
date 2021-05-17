const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const reservations = await knex("reservations");
        response.send(reservations);
    } catch (error) {
        response.status(500).send({ error: 'Something went wrong' })
        throw error
    }
});

router.get("/:id", async (request, response) => {
    try {
        const reservationID = request.params.id;
        const selectedMeal = await knex("reservations").where("id", reservationID);
        if (selectedMeal.length > 0) {
            response.send(selectedMeal[0]);
        } else {
            response.status(404).send({ error: 'Reservation id not found' })
        }
    } catch (error) {
        response.status(500).send({ error: 'Something went wrong' })
        throw error;
    }
})

router.post("/", async (request, response) => {
    try {
        const newReservation = await knex("reservations").insert(request.body);
        response.json(newReservation);
    } catch (error) {
        response.status(500).send({ error: 'Something went wrong' })
        throw error
    }
});

router.put("/:id", async (request, response) => {
    try {
        const reservationID = request.params.id;
        const updateReservation = await knex("reservations").where("id", reservationID).update(request.body);
        response.json(updateReservation);
    } catch (error) {
        response.status(500).send({ error: 'Something went wrong' })
        throw error
    }
})

router.delete("/:id", async (request, response) => {
    try {
        const reservationID = request.params.id;
        const deletedReservation = await knex("reservations").where("id", reservationID).del();
        response.json(deletedReservation);
    } catch (error) {
        response.status(500).send({ error: 'Something went wrong' })
        error
    }
})

module.exports = router;

