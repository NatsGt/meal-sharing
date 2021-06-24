import React from 'react';

const MealsContext = React.createContext({});
const MealsProvider = MealsContext.Provider;
export default MealsContext;
export { MealsProvider };