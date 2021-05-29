let dateStart = document.getElementById("date1");
let dateEnd = document.getElementById("date2");
document.querySelector(".btn").addEventListener("click", () => {
  getChart(dateStart, dateEnd);
});

let getChart = async (dateStart, dateEnd) => {
  // x-axis labels
  let days = [];
  for (let i = 1; i < 31; i++) {
    days.push(i);
  }

  // vals for active
  const vals = [];
  //   vals for recovered
  const valsRec = [];
  //   vals for dead
  const deadVals = [];

  //   fetching active covid cases api
  let resp = await fetch(
    `https://api.covid19api.com/country/india/status/confirmed?from=${dateStart.value}T00:00:00Z&to=${dateEnd.value}T00:00:00Z`
  );
  let data = await resp.json();

  //   fetching recovered covid cases api
  let respRec = await fetch(
    `https://api.covid19api.com/country/india/status/recovered?from=${dateStart.value}T00:00:00Z&to=${dateEnd.value}T00:00:00Z`
  );
  let dataRec = await respRec.json();

  //  fetching dead covid cases
  let deadRec = await fetch(
    `https://api.covid19api.com/country/india/status/deaths?from=${dateStart.value}T00:00:00Z&to=${dateEnd.value}T00:00:00Z`
  );
    let dataDead = await deadRec.json();
  //   pushing all the entries in the array
  for (let j = 0; j < data.length; j++) {
    vals.push(data[j].Cases);
    valsRec.push(dataRec[j].Cases);
    deadVals.push(dataDead[j].Cases)
  }
  //   plotting graph
  let ctx = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: days,
      datasets: [
        {
          label: "Active Cases in India",
          data: vals,
          backgroundColor: "rgba(91, 134, 229, 1)",
          borderWidth: 1,
          tension: 0.2,
        },
        {
          label: "Recovered Cases in India",
          data: valsRec,
          backgroundColor: "rgba(38, 166, 91, 1)",
          borderWidth: 1,
        },
        {
          label: "Deaths due to Covid in India",
          data: deadVals,
          backgroundColor: "rgb(240, 52, 52)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Covid Cases",
        },
      },
    },
  });
};
