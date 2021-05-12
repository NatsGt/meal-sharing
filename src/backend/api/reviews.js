const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const reviews = await knex("reviews");
        response.send(reviews);
    } catch (error) {
        throw error
    }
});

router.post("/", async (request, response) => {
    try {
        const newReview = await knex("reviews").insert(request.body);
        response.json(newReview)
    } catch (error) {
        throw error
    }
})

router.put("/:id", async (request, response) => {
    try {
        const reviewID = request.params.id;
        const updatedReview = await knex("reviews").where("id", reviewID).update(request.body);
        response.json(updatedReview);
    } catch (error) {
        throw error
    }
})

router.delete("/:id", async (request, response) => {
    try {
        const reviewID = request.params.id;
        const deletedReview = await knex("reviews").where("id", reviewID).del();
        response.json(deletedReview);
    } catch (error) {
        throw error
    }
})

module.exports = router;