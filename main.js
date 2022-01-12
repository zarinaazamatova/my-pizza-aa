//model MVC

localStorage.clear(); //чистим localStorage

let pizzaModel = {
    pizza: [], //Храним наши данные с json
    cart: []   // Корзина
}
counter = 0;

//controller
let appHandler = { // Здесь могут храниться все наши event обработчики
    selectOption: function() {
        const filterOption = document.querySelector(".filter-todo") // сортировщик выпадающий
        filterOption.addEventListener("change", function(event) {
            const e = event.target.value // значение списка
            if (e == "all") {
                view.displayPizza(pizzaModel.pizza) //вывод pizzaModel.pizza - где хранятся данные из json
            } else {
                var result = pizzaModel.pizza.filter((item) => { // в result кладем данные отфильтрованные от pizzaModel.pizza - MVC
                    return item.category == e
                 })
                 view.displayPizza(result)
            }            
        })
    },
      //метод добавления в корзину
    addPizzaToCart: function() {  // Селетктор на button add
      const point = document.querySelector('.roundpoint') // сумма в корзине
      /* const addBtn = do */
      window.addEventListener("click", function(event){
        if(event.target.hasAttribute("btn-to-cart")){ // клик по кнопке add to cart
            const card = event.target.parentElement;//находим карточку, куда нажимаем (родителя)
            const cardP = card.parentElement;
           console.log(cardP)
            // информация на cart.html
            const productInfo = { //собираем инфо и записываем в object
              id: cardP.querySelector('.card-img-top').getAttribute('data-id'),
              imgSrc: cardP.querySelector('.card-img-top').getAttribute('src'),
              title: cardP.querySelector('.card-img-top').getAttribute('alt'),
              price: cardP.querySelector('.card-text-p').innerText,
              count: 1              
       }
       pizzaModel.cart.push(productInfo)
       console.log(productInfo)
       localStorage['localCart'] = JSON.stringify(pizzaModel.cart);
           // информация в корзину
            let price = cardP.querySelector('.card-text-p').innerText;
            counter  +=  +price.slice(1);
            console.log(counter)
            point.innerHTML= "$ " + counter.toFixed(2)             
        }
      })
    }, 
    // метод для поиска search input
    filterInput: function(){
      const searchBar  = document.getElementById('pizza-search-name'); // находим элемент input для поиска
      searchBar.addEventListener('input', function(event){ //реагирует на input
        const target = event.target.value.toUpperCase();    // то, что вводим в input
        //target.style.color = "white"
       // let div = document.querySelectorAll(".pizza-item") // все карточки пицц
       // div.forEach(el => el.innerHTML = ""); 
        let filterPizzaName = pizzaModel.pizza.filter(el => el.title.toUpperCase().includes(target)); // фильтр по наименованию пиццы и вводимых данных

        view.displayPizza(filterPizzaName) // вызов функции с фильтром
      })

    }
  }

// view.displayPizza -- метод хранящий ф-ю выводa в index.html
let view = {
    displayPizza: function(data) {
        const container = document.querySelector('.menu-showcase');
        container.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
            let pizza = data[i]
           container.innerHTML +=  `
           <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                     <div class="thumbnail pizza-item"">
                       <img src="${pizza.img}" class="card-img-top" alt="${pizza.title}" data-id="${pizza.id}">
                       <div class="caption">
                         <h3>${pizza.title}</h3>
                         <p class="card-text">${pizza.desc}</p>
                         <p class="card-category">${pizza.category}</p>
                         <p class="card-text-p">$  ${pizza.price}</p>
                         <button btn-to-cart class="btn-cart btn-primary" role="button" data-id="${pizza.id}">Add To Cart</button>
                       </div>
                     </div>
               </div>
           `
        } 
    }
}//Метод объекта view



//fetchData from json file -- в pizzaModel.pizza храним данные с json
async function fetchData () {
  try {
    const response = await fetch('https://gist.githubusercontent.com/zarinaazamatova/1f6e0e6fc374985e12cfba715ad8059c/raw/a4c1a3bab7d4194cacb42f2d4c8793f8988ba3d2/pizza-project-team1.json')
    pizzaModel.pizza = await response.json() // Сохраняем дату 
    view.displayPizza(pizzaModel.pizza) // вызываем функцию из view
  } catch(e) {
    console.log(e,"er")
  }
}
fetchData()




appHandler.selectOption(); //вызов функции selectOption сортировка выпадающим списком
appHandler.addPizzaToCart(); //вызов на добавление в корзину
appHandler.filterInput();


/* ---------------------ночной режим------------------- */

const adjust = document.querySelector('.fa-adjust')
const main = document.querySelector('.main')
const jumbotron = document.querySelector('.jumbotron')
const h1 = document.querySelector(".h1")
const select = document.querySelector(".filter-todo")

adjust.addEventListener("click", () => {
  console.log(h1.style.color)
  
  if (h1.style.color === 'silver'){
    select.style.backgroundColor = "orange";
  main.style.backgroundImage = "url(https://jooinn.com/images/white-11.jpg)";
  h1.style.color = 'orange';
  jumbotron.style.backgroundImage = "url(https://jthemes.net/themes/html/testo/files/images/hero-5.jpg)";
  }
  else{
    select.style.backgroundColor = "silver";
    main.style.backgroundImage = "url(https://jthemes.net/themes/html/testo/assests/images/bg-01.jpg)";
    h1.style.color = 'silver';
    jumbotron.style.backgroundImage = "url(https://jthemes.net/themes/html/testo/assests/images/bg-01.jpg)";
  }
})