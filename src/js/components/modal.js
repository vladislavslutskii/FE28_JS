export const modal = document.getElementById("my_modal");
export const openBtn = document.getElementById("btn_modal_window");
export const closeBtn = document.getElementById("close");

openBtn.addEventListener(`click`, () => {
  modal.style.display = "block";
});

closeBtn.addEventListener(`click`, () => {
  modal.style.display = "none";
});

window.addEventListener(`click`, (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
