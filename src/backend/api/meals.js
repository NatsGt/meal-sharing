const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    if ("maxPrice" in request.query) {
      const maxPrice = request.query.maxPrice;
      const meals = await knex("meals").where("price", "<=", maxPrice);
      response.send(meals);
      return
    }
    if ("title" in request.query) {
      const title = request.query.title;
      const meals = await knex("meals").where("title", "like", "%" + title + "%");
      response.send(meals)
      return
    }
    if ("createdAfter" in request.query) {
      const createdAfter = request.query.createdAfter;
      const meals = await knex("meals").where("created_date", ">=", createdAfter);
      response.send(meals);
      return;
    }
    if ("limit" in request.query) {
      const limit = request.query.limit;
      const meals = await knex("meals").limit(limit);
      response.send(meals);
      return;
    }
    if ("availableReservations" in request.query) {
      const availableReservations = (request.query.availableReservations == 'true');
      if (availableReservations) {
        const meals = await knex.raw(`select meals.id, meals.title, meals.max_reservations, coalesce(SUM(reservations.number_of_guests), 0) AS made_reservations
      from meals
      left join reservations on meals.id = reservations.meal_id
      group by meals.id
      having meals.max_reservations > made_reservations`).then(res => response.send(res[0]))
        return
      } else {
        const meals = await knex("meals");
        response.send(meals);
        return
      }
    }
    const meals = await knex("meals");
    response.send(meals);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const mealID = request.params.id;
    const mealSelected = await knex("meals").where("id", mealID);
    response.send(mealSelected[0]);
  } catch (error) {
    throw error;
  }
})

router.post("/", async (request, response) => {
  try {
    const meals = await knex("meals").insert(request.body);
    response.json(meals);
  } catch (error) {
    throw error;
  }
})

router.put("/:id", async (request, response) => {
  try {
    const mealID = request.params.id;
    const mealSelected = await knex("meals").where("id", mealID).update(request.body)
    response.json(mealSelected);
  } catch (error) {
    throw error;
  }
})

router.delete("/:id", async (request, response) => {
  try {
    const mealID = request.params.id;
    const mealSelected = await knex("meals").where("id", mealID).del();
    response.json(mealSelected);
  } catch (error) {
    throw error;
  }
})



module.exports = router;
