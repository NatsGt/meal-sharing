import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import Home from './components/Home';
import Navigation from './components/Navigation';
import MealsList from './components/MealsList';
import MealId from './components/MealId';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/meals" >
            <MealsList />
          </Route>
          <Route path="/meals/:id" >
            <MealId />
          </Route>
          <Route exact path="/test-component">
            <TestComponent></TestComponent>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//https://meal-sharing-natsgt.herokuapp.com/