//SELECTORS
const body = document.querySelector("body");
const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".close");
const list = document.querySelector(".list")
const listCart = document.querySelector(".list-cart");
const total = document.querySelector(".total");
const quantity = document.querySelector(".quantity");

//ADD EVENTS LISTENERS
openShopping.addEventListener('click', () => {
    body.classList.add('active');
    // console.log(active);
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 220000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 123000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 320000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 130000
    },
];
let listCarts = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('Div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
      <img src= "${value.image}"> 
      <div class= "title">${value.name}</div> 
      <div class= "price">${value.price.toLocaleString()}</div> 
      <button onclick= "addToCart(${key})">Add to Cart</button>`;

        list.appendChild(newDiv);
    });
}
initApp();
function addToCart(key) {
    if (listCarts[key] == null) {
        listCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity = 1;
    }
    reloadCard();
}
addToCart();

function reloadCard() {
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCarts.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCart.appendChild(newDiv);
        }
    })
    total.innerHTML = totalPrice.toLocaleString();
    quantity.innerText = count;
};
function changeQuantity(key, quantity){
    if (quantity == 0) {
        delete listCarts[key];

    }else{
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * products[key].price;
    }
    reloadCard();
}
