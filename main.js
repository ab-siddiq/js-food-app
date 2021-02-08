const mealIngredients = document.getElementById('meal-ingredients');
function searchFood() {
    const searchItem = document.getElementById('search-box').value;
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`;
    if (searchItem != "" ) {
        
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            meals = data.meals;
            const foodItemsDiv = document.getElementById('food-items');
            let foodInfo = '';
            let foodIngredient = '';
            meals.forEach(meal => {
                foodInfo += `
                     <div class="food-item" onclick="getMealID(${meal.idMeal})">
                        <img src="${meal.strMealThumb}">
                        <h5>${meal.strMeal}</h5>
                    
                     </div>
                    `
                foodItemsDiv.innerHTML = foodInfo;
            });
           
        })
    }
    else{document.getElementById('food-items').innerHTML = `<p> Opps!</p> <p>You Search Empty!</p> <p>Nothing Found!</p>`;}
}

const getMealID = mealID => {
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    console.log(mealID);
    fetch(url)
        .then(res => res.json())
        .then(data => renderIngredientsInfo(data.meals[0]))

}
const renderIngredientsInfo = ingredients => {

    const ingredient = [];
    for (let i = 1; i <= 20; i++) {
        if (ingredients[`strIngredient${i}`]) {
            ingredient.push(
                `${ingredients[`strMeasure${i}`]} - ${ingredients[`strIngredient${i}`]
                }`
            );
        }
    }

    // console.log(ingredients.strIngredient1);

    const ingredientDIV = document.getElementById('meal-ingredients');
    ingredientDIV.innerHTML = `
    <div class="ingredients-info">
        <img src="${ingredients.strMealThumb}">
        
        <h2>${ingredients.strMeal}</h2>
        <h5>Ingredients</h5>
        <ul>
            ${ingredient.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
    </div>
    `

}