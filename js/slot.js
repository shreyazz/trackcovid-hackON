let pin = document.querySelector(".pin");
let district = document.querySelector(".district");
let age_eighteen = document.querySelector(".ei");
let age_fourtyfive = document.querySelector(".fo");
let covishield = document.querySelector(".covishield");
let covaxin = document.querySelector(".covaxin");
let free = document.querySelector(".free");
let paid = document.querySelector(".paid");

// State name
const statesLI = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "State Unassigned", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

let stateMaker = () => {
    let stateList = document.querySelector(".stateList");
    for (let c = 0; c < statesLI.length; c++) {
        let stateMakerList = `
            <li class="stateListi" id="${c}">${statesLI[c]}</li>
        `;
        stateList.innerHTML += stateMakerList;
    }
};

stateMaker();
// State Name End

// ----------------------------------------------------------------------------------------------------------------------------------------
let clickState = document.querySelectorAll(".stateListi");
let toolTip_new_new = document.addEventListener("click", function (e) {
    if (e.target.className == "stateListi" || e.target.className == "districtListi") {
        if (e.target.className == "stateListi") {
            let impStateName = e.target.id;
            let impStateName_value = statesLI[impStateName];
            let impState_Name_Box = document.getElementById("state_name_box");
            impState_Name_Box.innerText = impStateName_value;
        }    
        let responseAPI = async () => {
            let value = Number(e.target.id) + 1;
            console.log(value);
            // District Array start
            let location = value;
            let response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${String(location)}`);
            let data = await response.json();
            let arr = [];
            const name = [];
            for (let i = 0; i < data.districts.length; i++) {
                arr.push(data.districts[i].district_id);
                name.push(data.districts[i].district_name);
            }
            for (let a = 0; a < name.length; a++) {
                let districtList = document.querySelector(".districtList");
                let row = `
                        <li class="districtListi" id="${name[a]}">${name[a]}</li>
                    `
                districtList.innerHTML += row;
            }
            let toolTip = document.querySelector(".toolTip");
            toolTip.addEventListener("click", () => {
                document.addEventListener("click", async (eve) => {
                    let city_name = eve.target.id;
                    function checkCity(city) {
                        return city == city_name;
                    }

                    async function myFunction() {
                        var index = name.findIndex(checkCity);
                        let search_btn = document.querySelector(".btn");
                        search_btn.addEventListener("click", () => {
                            const day = document.getElementById('day').value.split("-").reverse().join("-");
                            let res = async () => {
                                let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${arr[index]}&date=${day}`);
                                let data = await response.json();
                                console.log(data);
                                function buildTable() {
                                    let table = document.querySelector(".slot_result");
                                    for (let i = 0; i < data.sessions.length; i++) {
                                        if (data.sessions[i].available_capacity === 0) {
                                            var row = `
                                                <div class="row ${data.sessions[i].vaccine} ${data.sessions[i].fee_type} FourtyFive">
                                                    <p class="h_name">${data.sessions[i].name}</p>
                                                    <p class="a_name">Booked</p>
                                                    <p class="v_name">${data.sessions[i].vaccine}</p>
                                                    <p class="age_name">${data.sessions[i].min_age_limit}+</p>
                                                    <p class="fee_name">${data.sessions[i].fee_type}</p>
                                                </div>
                                                `
                                        } else {
                                            var row = `
                                                <div class="row ${data.sessions[i].vaccine} ${data.sessions[i].fee_type} FourtyFive">
                                                    <p class="h_name">${data.sessions[i].name}</p>
                                                    <p class="a_name green">${data.sessions[i].available_capacity} Slot</p>
                                                    <p class="v_name">${data.sessions[i].vaccine}</p>
                                                    <p class="age_name">${data.sessions[i].min_age_limit}+</p>
                                                    <p class="fee_name">${data.sessions[i].fee_type}</p>
                                                </div>
                                            `
                                        }
                                        table.innerHTML += row;
                                    }
                                }
                                buildTable()
                            };
                            res();
                        });
                    }
                    myFunction();
                });
            })
        };
        responseAPI();
    }
})

function clearElement() {
    location.reload();
}
// ToolTip Code
let toolTip = document.querySelector(".toolTip");
let toolTip_new = document.querySelector(".toolTip_new");
let btn_first = document.querySelector("#state_name_box");
let btn_second = document.querySelector("#district_name_box");
document.addEventListener("click", (e) => {
    if (e.target.id == "state_name_box") {
        toolTip_new.classList.add("active");
    } else {
        toolTip_new.classList.remove("active");
    }
    if (e.target.id == "district_name_box") {
        toolTip.classList.add("active");
    } else {
        toolTip.classList.remove("active");
    }
});

// Data fetch code start here....

// let cityName = document.getElementById("cityName").value;


function ei() {
    age_eighteen.classList.toggle("active_btn");

}

function fo() {
    age_fourtyfive.classList.toggle("active_btn")
}

function covisheild_new() {
    covishield.classList.toggle("active_btn");
}

function covaxin_new() {
    covaxin.classList.toggle("active_btn");
}

function free_new() {
    free.classList.toggle("active_btn");
}

function paid_new() {
    paid.classList.toggle("active_btn");
}