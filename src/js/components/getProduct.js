// Получение данных с mockapi
export function getProduct() {
  return fetch(`https://62d13a45dccad0cf17633ca6.mockapi.io/Curs`, {
    method: `GET`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then(
      (productCard) =>
        (cards.productCard = cards.productCard.concat(productCard))
    );
}
// _______________________

export const cards = {
  productCard: [],
};
