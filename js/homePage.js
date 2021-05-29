// states according to their state id as their index numbers
const states = [
  "total",
  "andamanandnicobarislands",
  "andhrapradesh",
  "arunachalpradesh",
  "assam",
  "bihar",
  "chandigarh",
  "chhattisgarh",
  "dadra",
  "delhi",
  "goa",
  "gujarat",
  "haryana",
  "himachalpradesh",
  "jammuandkashmir",
  "jharkhand",
  "karnataka",
  "kerala",
  "ladakh",
  "lakshadweep",
  "madhyapradesh",
  "maharashtra",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "odisha",
  "puducherry",
  "punjab",
  "rajasthan",
  "sikkim",
  "stateunassigned",
  "tamilnadu",
  "telangana",
  "tripura",
  "uttarpradesh",
  "uttarakhand",
  "westbengal",
];

// covid cases according to search
const optionsList = document.querySelectorAll(".state_name");
document.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    let place = document
      .getElementById("place")
      .value.replace(/ /g, "")
      .toLowerCase();
    for (let i = 0; i < states.length; i++) {
      if (states[i] == place) {
        async function getCovid() {
          let apiBase = "https://api.covid19india.org/data.json";
          let resp = await fetch(apiBase);
          let data = await resp.json();
          document.querySelector(
            ".active_Cases_number"
          ).innerText = ` ${data.statewise[i].active}`;
          document.querySelector(
            ".recovered_Cases_number"
          ).innerText = ` ${data.statewise[i].recovered}`;
          document.querySelector(
            ".death_Cases_number"
          ).innerText = ` ${data.statewise[i].deaths}`;
          document.querySelector(
            ".total_cases"
          ).innerText = ` ${data.statewise[i].confirmed}`;
        }
        getCovid();
        break;
      }
    }
  }
});

// covid cases data for state reports
let StateCovid = async () => {
  let apiBase = "https://api.covid19india.org/data.json";
  let resp = await fetch(apiBase);
  let data = await resp.json();
  let cases = document.querySelectorAll(".casesNumberState");
  let updateTime = (document.querySelector(
    ".lastUpdate"
  ).innerText = `Last Updated on: ${data.statewise[0].lastupdatedtime}`);
  for (let j = 1; j < data.statewise.length; j++) {
    cases[j].innerHTML = data.statewise[j].active;
  }
};
StateCovid();

// js for toolTip

let toolTip = document.querySelector(".toolTip");
let search = document.getElementById("place");
document.addEventListener("click", (e) => {
  if (e.target.id == "place") {
    toolTip.classList.add("active");
  } else {
    toolTip.classList.remove("active");
  }
});

// state list for ul, li
const statesLI = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "State Unassigned",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

let stateList = () => {
  let ul = document.querySelector(".stateList");
  for (let k = 0; k < statesLI.length; k++) {
    let col = `

      <li id="${statesLI[k]}"> ${statesLI[k]} </li>

    `;
    ul.innerHTML += col;
  }
};
stateList();

document.addEventListener("click", (e) => {
  let searchVal = document.getElementById("place");
  let a = e.target.id;
  if (a != "place") {
    console.log(a);
    searchVal.value = a;
  }
});

let searchPlace = () => {
  let filter = document.getElementById("place").value.toUpperCase();
  let ul = document.querySelector("ul");
  let li = document.querySelectorAll("li");
  for (let l = 0; l < li.length; l++) {
    let a = li[l].innerHTML.toUpperCase();
    if (a.indexOf(filter) > -1) {
      li[l].style.display = "block";
    } else {
      li[l].style.display = "none";
    }
  }
};

searchPlace();


// alert icon tool Tip
let iconAlert = document.querySelector('.alert');
let iconAlertTool = document.querySelector('.toolTipAlert');
iconAlert.addEventListener('click', ()=>{
  iconAlertTool.classList.toggle('activeAlert')
})


document.querySelector('.reload').addEventListener('click', ()=>{
  location.reload();
});