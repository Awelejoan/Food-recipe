const searchBtn = document.getElementById('search-btn')
const mealList = document.getElementById('meal')
const mealDetailContent = document.querySelector('.meal-details-content')
const recipeCloseBtn = document.getElementById('close-btn')

searchBtn.addEventListener('click', getmealList)
 mealList.addEventListener('click', getmealrecipe)
 recipeCloseBtn.addEventListener('click', ()=>{
    mealDetailContent.parentElement.classList.remove('show-recipe')
 })

function getmealList() {
    let searchInputText = document.getElementById
        ('search-input').value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(response => response.json())
        .then(data => {
            let input = ''
            if (data.meals) {
                {
                    data.meals.map((meal) => {
                        input += ` <div class="meal-item" data-id=${meal.idMeal}>
                                        <div class="meal-img">
                                            <img src="${meal.strMealThumb}" alt="Delicious meal">
                                        </div>
                                        <div class="meal-name">
                                            <h3>${meal.strMeal}</h3>
                                            <a href="#" class="recipe-btn">Get Recipe</a>
                                        </div>
                                    </div>`
                    })
                }
                mealList.classList.remove('not-found');
            }else{
               input =`Sorry, We Can't Find Any Meal`
               mealList.classList.add('not-found')
                
            }
            mealList.innerHTML = input
        })
}

function getmealrecipe(e) {
    e.preventDefault()
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem =e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
    }
}
//create a modal for each meal
function mealRecipeModal(meal) {
    meal = meal[0]
    let html =`
     <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <h3>Instructions:</h3>
    <p class="recipe-instruct">${meal.strInstructions}
    </p>


    <div class="recipe-meal-img">
        <img src=${meal.strMealThumb} alt="">
    </div>
    <div class='recipe-link'>
        <a href=${meal.strYoutube} target="_blank">Watch Videos</a>
    </div>`;
    mealDetailContent.innerHTML = html
    mealDetailContent.parentElement.classList.add('show-recipe')
    
}