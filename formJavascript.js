window.addEventListener("DOMContentLoaded", init);

function init() {
  // eventlistener på "fb-but" og ".dantoto"
  document.querySelector(".dantoto").addEventListener("click", alertboks);
  document.querySelector(".fb-but").addEventListener("click", alertboks);
}

function alertboks() {
  alert(
    "OBS: This is a school project - it does not allow you to log in usinig this function"
  );
}

//POST
function post(nyUser) {
  //sends a request to add new data to the datasheet
  const postData = JSON.stringify(nyUser);
  fetch("https://dantoto-7fd4.restdb.io/rest/brugere?", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce54e1d780a473c8df5caec",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        //det gik ikke
        visModal_wrong();
      } else {
        //det gik, brugeren blev oiprettet
        visModal();
      }
    });
}
const formular = document.querySelector("#add");
formular.addEventListener("submit", e => {
  formular.elements.brugernavn.disabled = true;
  e.preventDefault();
  console.log("submitted");
  const payload = {
    brugernavn: formular.elements.brugernavn.value,
    mail: formular.elements.mail.value,
    kode: formular.elements.kode.value
  };
  post(payload);
});

let modal;
//MODAL
function visModal() {
  modal = document.querySelector("#modalen");
  modal.classList.add("vis");
  document.querySelector(".modal__featured").style.display = "none";
}
//MODAL WRONG
function visModal_wrong() {
  modal = document.querySelector("#modalen_wrong");
  modal.classList.add("vis");
  document.querySelector(".modal__featured").style.display = "none";
  modal.querySelector(".luk").addEventListener("click", skjulModal);
}

function skjulModal() {
  modal.classList.remove("vis");
}
