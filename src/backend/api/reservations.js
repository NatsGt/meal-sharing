const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const reservations = await knex("reservations");
        response.send(reservations);
    } catch (error) {
        throw error
    }
});

router.get("/:id", async (request, response) => {
    try {
        const reservationID = request.params.id;
        const selectedMeal = await knex("reservations").where("id", reservationID);
        response.send(selectedMeal[0]);
    } catch (error) {
        throw error;
    }
})

router.post("/", async (request, response) => {
    try {
        const newReservation = await knex("reservations").insert(request.body);
        response.json(newReservation);
    } catch (error) {
        throw error
    }
});

router.put("/:id", async (request, response) => {
    try {
        const reservationID = request.params.id;
        const updateReservation = await knex("reservations").where("id", reservationID).update(request.body);
        response.json(updateReservation);
    } catch (error) {
        throw error
    }
})

router.delete("/:id", async (request, response) => {
    try {
        const reservationID = request.params.id;
        const deletedReservation = await knex("reservations").where("id", reservationID).del();
        response.json(deletedReservation);
    } catch (error) {
        error
    }
})

module.exports = router;

