let input = document.getElementById("search");
let searchBtn = document.getElementById("search-btn");
let mealsDiv = document.getElementById("meals");
let resultDiv = document.getElementById("result");

resultDiv.classList.add("hide");
mealsDiv.classList.remove("hide");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchBtn.click();
    event.preventDefault();
  }
});

searchBtn.addEventListener("click", () => {
  if (input.value) {
    resultDiv.classList.add("hide");
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input.value}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (!data.meals) {
          mealsDiv.innerHTML = "";
          mealsDiv.innerHTML = `<h2 class="text-danger">No Available Data</h2>`;
        } else {
          mealsDiv.innerHTML = "";
          for (let i = 0; i < data.meals.length; i++) {
            mealsDiv.innerHTML += `
            <div class="card shadow" style="width: 18rem">
              <img src="${data.meals[i].strMealThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title mb-4">${data.meals[i].strMeal}</h5>
                <a href="#" data-id="${data.meals[i].idMeal}" class="get-btn btn btn-primary d-block text-center">Get Recipe</a>
              </div>
            </div>
            `;
          }
        }
      });
  } else return false;
});

mealsDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("get-btn")) {
    mealsDiv.classList.add("hide");
    resultDiv.classList.remove("hide");
    let id = e.target.getAttribute("data-id");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (!data.meals) {
          resultDiv.innerHTML = "";
          resultDiv.innerHTML = `<h2 class="text-danger">No Available Recipe</h2>`;
        } else {
          resultDiv.innerHTML = "";
          console.log(data.meals[0]);
          resultDiv.innerHTML = `
          <div class="container d-flex py-5 text-danger">
            <i class="fa-regular fa-circle-xmark"></i>
            <h1 class="text-success">${data.meals[0].strMeal}: <span class="display-6 text-primary">(${data.meals[0].strArea})</span></h1>
            <p class= "text-secondary my-4">${data.meals[0].strInstructions}</p>
            <a target="_blank" href = "${data.meals[0].strYoutube}" class=" btn btn-danger px-5">Watch Video</a>
          </div>
          `;
        }
      });
  }
});

resultDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-circle-xmark")) {
    mealsDiv.classList.remove("hide");
    resultDiv.classList.add("hide");
  }
});

console.log("Second Commit To Git");
