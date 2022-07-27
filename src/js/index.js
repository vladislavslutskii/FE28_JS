import { post } from "jquery";
import { openBtn, modal, closeBtn } from "./components/modal.js";
import trashData from "./components/data.js";
import { getProduct, cards } from "./components/getProduct.js";

const postList = document.getElementById(`card1`);

// Загрузка карточек
window.onload = funonload;
async function funonload() {
  await getProduct();
  await fillProductList(cards.productCard);
  showTrash();
}
// ________________________

// Создание карточек с товаром
const createCard = (card, index) =>
  `<div class="card">
	<div class="card-img">
		<img class="photo" src="${card.image}" alt="#">
		<span class="discount">${card.discount}</span>
		<button class="trash-can"><img  src="${
      card.trash_can
    }" data-articul="${index}" alt="#" class="to-cart"></button>
		
		<button class="fast-viev" data-hystmodal="${
      `#` + `mymodal` + index
    }">Быстрый просмотр</button>
	</div>

	<div class="card-info">
		<div class="card-info-price">
			<p class="card-info-newprice">${card.newPrice}</p>
			<p class="card-info-oldprice">${card.oldPrice}</p>
		</div>
		<p class="card-info-nameitem" >${card.title}</p>
	</div>
	
	<div class="hystmodal" id="${`mymodal` + index}" aria-hidden="true">
    <div class="hystmodal__wrap">
        <div class="hystmodal__window" role="dialog" aria-modal="true">
            <button data-hystclose class="hystmodal__close">Закрыть</button>
          <img src="${card.image}" alt="#">
        </div>
    </div>

</div>
</div>
`;
// ________________________

// Заполнние карточек
const fillProductList = (productCard) => {
  postList.innerHTML = ``;
  if (productCard.length) {
    productCard.forEach(
      (post, index) => (postList.innerHTML += createCard(post, index))
    );
  }
};
// ________________________

// Добавление товаров в корзину
window.addEventListener(`click`, (event) => {
  if (event.target.classList.contains(`to-cart`)) {
    let articul = event.target.dataset[`articul`];
    if (trashData[articul] !== undefined) {
      trashData[articul][`count`]++;
      showTrash();
    } else {
      trashData[articul] = cards.productCard[articul];
      trashData[articul][`count`] = 1;
      showTrash();
    }
    console.log(trashData);
    localStorage.setItem(`cartContent`, JSON.stringify(trashData));
  }
});
// _______________________

// Отображение карточек в корзине
function showTrash() {
  let out1 = `
	<div class="modal_content">
	<div class="div-wrap">
	<div class="wrap-header">
	<p class="wrap-header-text">Корзина</p>
	<button class="wrap-header-btn" id="deleteBtn">Очистить корзину</button>
	</div>
	<div class="wraps" id="delete">`;
  for (let key in trashData) {
    out1 += `<div class="wrap1">`;
    out1 += `<p class="wrap-title">${trashData[key][`title`]}</p>`;
    out1 += `<p class="count" >${trashData[key][`count`]}</p>`;
    out1 += `<p class="price">${trashData[key][`newPrice`]}</p>`;
    out1 += `</div>`;
  }
  out1 += `</div>
	<div class="wrap-total">
	<p class="curent-total" id="curr">$</p>
	</div>
	</div>`;
  document.getElementById(`my_modal`).innerHTML = out1;

  // Счёт общей суммы товаров
  const calcCartPrice = () => {
    const cartItems = document.querySelectorAll(`.wrap1`);
    let totalPrice = 0;
    cartItems.forEach(function (item) {
      const count = item.querySelector(`.count`);
      const price = item.querySelector(`.price`);
      let curentPrice =
        parseFloat(count.innerText) * parseFloat(price.innerText);
      totalPrice += curentPrice;
    });
    totalPrice = totalPrice.toFixed(2);
    document.getElementById(`curr`).textContent =
      `Итого:` + ` ` + totalPrice + ` ` + `$`;
  };
  calcCartPrice();
  // _______________________

  // Удаление всех товаров из корзины
  document.getElementById(`deleteBtn`).addEventListener(`click`, () => {
    for (const prop of Object.getOwnPropertyNames(trashData)) {
      delete trashData[prop];
    }
    let description = document.getElementById(`delete`);
    description.remove();
    document.getElementById(`curr`).textContent =
      `Итого:` + ` ` + `0.00` + ` ` + `$`;
    localStorage.removeItem(`cartContent`);
  });
  // _______________________
}

// Добавление модального окна к карточке товара
const myModal = new HystModal({
  linkAttributeName: "data-hystmodal",
});

// Находим тег html и сохраняем его
let html = document.documentElement;
//сохраним текущую прокрутку:
let scrollPosition = window.pageYOffset;
//установим свойство top у html равное прокрутке
html.style.top = -scrollPosition + "px";
html.classList.add("hystmodal__opened");

html.classList.remove("hystmodal__opened");
//прокручиваем окно туда где оно было
window.scrollTo(0, scrollPosition);
html.style.top = "";
// _______________________
