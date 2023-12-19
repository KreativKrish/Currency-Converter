const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name == "from" && currCode == "USD") {
      newOption.selected = true;
    } else if (select.name == "to" && currCode == "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    // console.log(evt.target.value);
    updateFlag(evt.target);
  });
}

function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com//${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  //   if (target.name == "from") {
  //     document.getElementById(
  //       "from"
  //     ).src = `https://flagsapi.com//${code}/shiny/64.png`;
  //   } else if (target.name == "to") {
  //     document.getElementById(
  //       "to"
  //     ).src = `https://flagsapi.com//${code}/shiny/64.png`;
  //   }
}

const updateExchange= async ()=> {
  let amt = document.querySelector(".amount input");
  let amtVal = amt.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amt.value = "1";
  }

  let from =fromCurr.value.toLowerCase(), to = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${from}/${to}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[to];
  let finalAmt = rate * amtVal;

  msg.innerText = `${amtVal} ${from.toUpperCase()} = ${finalAmt} ${to.toUpperCase()}`
  console.log(finalAmt);
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchange();
  
});

window.addEventListener("load", ()=>{
  updateExchange();
});

// const getData = async()=> {
//   console.log("Getting data.... ");
//   let response = await fetch(URL); //fetch will return a promise
//   console.log(response); //JSON format
//   let data = await response.json();
//   return data;
// };
