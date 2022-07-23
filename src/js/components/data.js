// Данные корзины
const trashDataJSON = localStorage.getItem(`cartContent`) || `{}`;
const trashData = JSON.parse(trashDataJSON);
// _______________________

export default trashData;
