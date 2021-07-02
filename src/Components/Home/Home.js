import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Meal from '../Meal/Meal';
import './Home.css'

const  Home = () => {
    const [meals, setMeals] = useState([])
   useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => setMeals(data.categories))
   }, [])

  return (
      <div className="meals">
          {
              meals.map(meal => <Meal key={meal.idCategory} meal={meal}></Meal> )
          }
      </div>
  );
}
export default Home;