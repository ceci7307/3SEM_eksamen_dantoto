window.addEventListener("DOMContentLoaded", init);

let hesteTemplate = document.querySelector("#heste-template");
let hesteContainer = document.querySelector(".data-container");
let heste;
let penge;
let oddset;
let calc;

function init() {
  /* document.querySelector("#knap").onclick = function() {
    location.href = "form.html";
  }; */

  document.querySelector("#knap").addEventListener("click", () => {
    visModal();
  });

  LoadJSON();
}

// Hent JSON
async function LoadJSON() {
  let jsonData = await fetch("heste.json");
  heste = await jsonData.json();
  console.log(heste);
  visHestePage();
}
// Viser og kloner
function visHestePage() {
  heste.forEach(hest => {
    let klon = hesteTemplate.cloneNode(true).content;
    klon.querySelector(".data-hestenavn").textContent = hest.Hestens_navn;
    klon.querySelector(".data-jockeynavn").textContent = hest.Jockeys_navn;
    klon.querySelector(".data-beskrivelse").textContent = hest.Beskrivelse;
    klon.querySelector(".more").addEventListener("click", aaben);
    klon.querySelector(".data-id").textContent = hest.id;
    klon.querySelector(".data-odds").textContent = "Odds:" + " " + hest.Odds;

    klon.querySelector(".choose").dataset.odds = hest.Odds;

    klon.querySelector(".data-billede").src = hest.billede;
    hesteContainer.appendChild(klon);
  });
  regnSaldo();
}

//Åben/luk infobox
function aaben(e) {
  console.log(e.target.parentElement.nextElementSibling);
  e.target.parentElement.nextElementSibling.style.display = "block";
  e.target.textContent = "︿";
  e.target.addEventListener("click", luk);
}
function luk(e) {
  e.target.parentElement.nextElementSibling.style.display = "";
  e.target.textContent = "﹀";
}

//BEREGN SALDO
function regnSaldo() {
  document.querySelector(".tyve").addEventListener("click", setcalc => {
    calc = 20;
    regn();
  });
  document.querySelector(".ethund").addEventListener("click", setcalc => {
    calc = 100;
    regn();
  });
  document.querySelector(".tohund").addEventListener("click", setcalc => {
    calc = 200;
    regn();
  });
  document.querySelector(".halvtreds").addEventListener("click", setcalc => {
    calc = 50;
    regn();
  });
}

function regn() {
  penge = 100 - calc;
  document.querySelector(".kr").textContent = penge;
  console.log(penge);
  setOdds();
}
//BEREGN GEVINST
function setOdds() {
  document.querySelectorAll(".choose").forEach(each => {
    each.addEventListener("click", setodds => {
      const checkbox = setodds.target;
      console.log(checkbox);
      oddset = checkbox.dataset.odds;
      console.log(oddset);
      regnGevinst();
    });
  });
}

function regnGevinst() {
  let gevinst = calc * oddset;
  document.querySelector(".gevinst").textContent = gevinst;
}

//MODAL
function visModal() {
  let modal = document.querySelector("#modal");
  modal.classList.add("vis");
  modal.querySelector(".luk").addEventListener("click", skjulModal);
}
function skjulModal() {
  modal.classList.remove("vis");
}
