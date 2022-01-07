//console.log(JSON.parse(localStorage['localCart']))
const sum = document.querySelector('.total')
const panel = document.querySelector('.panel-body')
let count=0;


var cart = JSON.parse(localStorage['localCart']);//парсим localStorage
renderData(cart) //заполняем таблицу данными
function renderData(cart) {
    for (let item of cart) {
        panel.innerHTML += `<article class="menu-item" data-id="${item.id}">
        <img src="${item.imgSrc}" class="photo" alt="${item.title}" />
        <div class="item-info">
            <header>
            <h4 class="title">${item.title}</h4>
            <h4 class="price">${item.price}</h4>
            </header>
            <div class="action">
            <button class="add-cart filter-btn" id="increase" ><</button>
            <p class="item-text">${item.count}</p>
            <button class="add-cart filter-btn" id="decrease">></button>
            </div>
        </div>
        </article><hr></hr>`;
        count  +=  +item.price.slice(1);
    }
    sum.innerHTML= "Total sum $ " + count.toFixed(2)   
}



