let RowData = document.getElementById("RowData");
let searchName = document.getElementById("searchName");
let submitBtn;
$(document).ready(function () {
  searchByName("").then(() => {
    $(".loading").fadeOut(5000);
    $("body").css("overflow", "visible");
  });
});

function openNav() {
  $(".nav ").animate({ left: 0 }, 1000);
  $(".open-close-icon").removeClass("fa-x ");
  $(".open-close-icon").addClass(" fa-align-justify");

  for (let i = 0; i < 5; i++) {
    $(".nav-links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
function closeSide(parameters) {
  let boxWidth = $(".nav .nav-tab ").outerWidth();

  $(".nav ").animate({ left: -boxWidth }, 1000);

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass(" fa-x");
  $(".nav-links li").animate({ top: 300 }, 500);
}
closeSide();

$(".nav i.open-close-icon ").click(() => {
  if ($(".nav").css("left") == "0px") {
    closeSide();
  } else {
    openNav();
  }
});

async function searchByName(term) {
  $(".loading").fadeOut(5000);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  displayMeals(response.meals);
}
searchByName("");

function displayMeals(arr) {
  let cart = "";
  for (let i = 0; i < arr.length; i++) {
    cart += `<div class="col-md-3">
                <div onclick="getMealsDetails('${arr[i].idMeal}')" class="meal point position-relative overflow-hidden rounded-2">
                    <img class="w-100 rounded-2" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="layer-meal position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            
    
    `;

    RowData.innerHTML = cart;
  }
}

async function getCatagories() {
  $(".loading").fadeOut(5000);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCatagories(response.categories);
}

getCatagories();

function displayCatagories(arr) {
  let cart = "";
  for (let i = 0; i < arr.length; i++) {
    cart += `<div class="col-md-3 point">
                <div onclick="getCatagoriesByMeals('${
                  arr[i].strCategory
                }')" class=" meal position-relative overflow-hidden rounded-2">
                    <img class="w-100 rounded-2" src="${
                      arr[i].strCategoryThumb
                    }" alt="" srcset="">
                    <div class="layer-meal position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 9)
                          .join(" ")}</p>
                
                    </div>
                </div>
            </div>    
   `;
    RowData.innerHTML = cart;
  }
}

async function getArea() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
}

function displayArea(arr) {
  let cart = "";
  for (let i = 0; i < arr.length; i++) {
    cart += `<div  onclick="getAreaMeals('${arr[i].strArea}')"  class="col-md-3 point">
                <div class=" rounded-2">
                <i class="fa-solid fa-house-chimney fa-3x"></i>
                    <h3>${arr[i].strArea}</h3>
                </div>
            </div>    
   `;
    RowData.innerHTML = cart;
  }
}

async function getIngredients() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));
}

/**Ingredients Meal Api */
function displayIngredients(arr) {
  let cart = "";
  for (let i = 0; i < arr.length; i++) {
    cart += `<div
       class="col-md-3 text-center py-3">
                <div onclick="getIngredientsMeals('${
                  arr[i].strIngredient
                }')"  class=" rounded-2">
              <i class="fa-solid fa-cookie-bite fa-2x text-success"></i>
                    <h3>${arr[i].strIngredient}</h3>
                    <p class="text-align-center">${arr[i].strDescription
                      .split(" ")
                      .slice(0, 10)
                      .join(" ")}</p>
                </div>
            </div>    
   `;
    RowData.innerHTML = cart;
  }
}

/**Catagories Meal Api */
async function getCatagoriesByMeals(categories) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
}
/**Area Meal Api */
async function getAreaMeals(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  console.log(response);
  displayMeals(response.meals.slice(0, 20));
}
/**Ingredients Meal Api */
async function getIngredientsMeals(ingredients) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  console.log(response);
  displayMeals(response.meals.slice(0, 20));
}

/**Details Api Meals */
async function getMealsDetails(mealID) {
  let response =
    await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}
`);
  response = await response.json();
  DisplayDetails(response.meals[0]);
}
function DisplayDetails(meal) {
  let ingredients = ``;
  for (i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info p-1 m-2"> ${
        meal[`strIngredient${i}`]
      } ${meal[`strMeasure${i}`]}</li>`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagStr = "";
  for (let i = 1; i < tags.length; i++) {
    tagStr += `
       <li class="alert alert-danger p-1 m-3">${tags[i]}</li> 
    `;
  }

  let cart = `
       <div class="col-md-4 ">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bold">Area :</span>${meal.strArea}</h3>
                <h3><span class="fw-bold">Category :</span>${meal.strCategory}</h3>
                <ul class="list-unstyled d-flex g-2 flex-wrap xx">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-2 flex-wrap xx">
                   ${tagStr}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>

            </div>
  
  `;
  RowData.innerHTML = cart;
}
function getSearchInputs() {
  searchName.innerHTML = `
 
        <div class="row py-4">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent  text-white" placeholder="Search By Name ">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(this.value)" type="text" maxlength="1" class="form-control bg-transparent text-white" placeholder="Search By First Letter ">
            </div>
        </div>
   
  `;
  RowData.innerHTML = "";
}
/**Search Api By Name */
async function searchByName(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}
/**Search By Letter */
async function searchByLetter(term) {
  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}

/**Contact */
function getContacts() {
  RowData.innerHTML = `
 <div class="contact min-vh-100  d-flex justify-content-center align-items-center">
                <div class="container w-75 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input id="nameInput" onkeyup="inputValidation()" type="text" class=' text-white form-control bg-transparent'
                                placeholder="Enter Your Name">
                            <div id="nameAlret" class="alert alert-danger w-100 mt-2 d-none  ">
                                Special characters and Number not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="emailInput" onkeyup="inputValidation()" type="email" 
                                class=' text-white form-control bg-transparent' placeholder="Enter Your Email">
                            <div id="emailAlret" class="alert alert-danger  w-100 mt-2 d-none ">
                                Email Not Valid *Example@ee.com
                            </div>
                        </div>

                        <div class="col-md-6">
                            <input id="telInput" onkeyup="inputValidation()" type="tel" 
                                class='text-white form-control bg-transparent' placeholder="Enter Your Phone">
                            <div id="PhoneAlret" class="alert alert-danger w-100  mt-2  d-none">
                                Phone not valid
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="ageInput" onkeyup="inputValidation()" type="number" 
                                class='text-white form-control bg-transparent' placeholder="Enter Your Age">
                            <div id="AgeAlret" class="alert alert-danger w-100 mt-2 d-none ">
                                Age Not valid
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="passwordInput" onkeyup="inputValidation()" type="password" 
                         class='text-white form-control bg-transparent' placeholder="Enter Your Password">
                            <div id="PasswordAlret" class="alert alert-danger w-100 mt-2 d-none  ">
                               *Min 8 Character 1 Number*
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="rePasswordInput" onkeyup="inputValidation()" type="password" 
                                class='text-white  form-control bg-transparent'  placeholder="Enter Your RePassword">
                            <div id="RepasswordAlret" class="alert alert-danger  mt-2  d-none ">
                                Plz Enter Your Repassword
                            </div>
                        </div>
                    </div>

                    <button id="submitBtn" disabled class="btn btn-outline-danger  mt-3">Submit</button>

                </div>
            </div>
  
  `;
  submitBtn = document.getElementById("submitBtn");
}

function inputValidation() {
  if (nameValidation()) {
    document.getElementById("nameAlret").classList.add("d-block", "d-none");
  } else {
    document.getElementById("nameAlret").classList.remove("d-none", "d-block");
  }
  if (emailValidation()) {
    document.getElementById("emailAlret").classList.add("d-block", "d-none");
  } else {
    document.getElementById("emailAlret").classList.remove("d-none", "d-block");
  }
  if (phoneValidation()) {
    document.getElementById("PhoneAlret").classList.add("d-block", "d-none");
  } else {
    document.getElementById("PhoneAlret").classList.remove("d-none", "d-block");
  }
  if (ageValidation()) {
    document.getElementById("AgeAlret").classList.add("d-block", "d-none");
  } else {
    document.getElementById("AgeAlret").classList.remove("d-none", "d-block");
  }
  if (passwordValidation()) {
    document.getElementById("PasswordAlret").classList.add("d-block", "d-none");
  } else {
    document
      .getElementById("PasswordAlret")
      .classList.remove("d-none", "d-block");
  }
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    rePasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}
function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("telInput").value
  );
}
function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}
function passwordValidation() {
  return /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}
function rePasswordValidation() {
  return (
    document.getElementById("rePasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
