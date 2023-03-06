function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
  
    if (hours < 10) {
      hours = "0" + hours;
    }
  
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }
  
  setInterval(updateTime, 1000);

// dynamic temp chart 
$(document).ready(function() {
  var ctx = document.getElementById("barchart").getContext("2d");

  var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    }]
  };
  var options = {
    animation: false,
    //Boolean - If we want to override with a hard coded scale
    scaleOverride: true,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps: 10,
    //Number - The value jump in the hard coded scale
    scaleStepWidth: 10,
    //Number - The scale starting value
    scaleStartValue: 0
  };

  // var myLineChart = new Chart(ctx).Line(data, options);
  var myLineChart = new Chart(ctx , {
    type: "line",
    data: data, 
    options: options
});

  setInterval(function() {
    setData(data.datasets[0].data);
    setLabels(data.labels);

    var myLineChart = new Chart(ctx , {
      type: "line",
      data: data, 
      options: options
  });

  }, 2000);

  let curName = '1';
  async function setLabels(labels) {
    filename= nextName(curName)+".csv";
    curName=nextName(curName);
    const response = await   fetch(filename);
     const data = await response.text();
    // // const day = [];
    // // const temps = [];
    //  const rows = data.split(',').slice(1);
     const cols=data.split(',');
     const tim=cols[0].split(' ');
    // // let len=rows.length;
    // console.log(tim);
    var nextMonthIndex = months.indexOf(labels[labels.length - 1]) + 1;
    var nextMonthName = months[nextMonthIndex] != undefined ? months[nextMonthIndex] : "January";
    labels.push(tim[1]);
    labels.shift();
  }

  async function setData(data1) {
    filename= nextName(curName)+".csv";
    const response = await  fetch(filename);
     const data = await response.text();
    // // const day = [];
    // // const temps = [];
    //  const rows = data.split(',').slice(1);
     const cols=data.split(',');
    console.log(cols);

    data1.push(parseFloat(cols[4]));
    data1.shift();
  }
  
  function convertMonthNameToNumber(monthName) {
    var myDate = new Date(monthName + " 1, 2016");
    var monthDigit = myDate.getMonth();
    return isNaN(monthDigit) ? 0 : (monthDigit + 1);
  }
  
  var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

});
 

// 
op = nextName('1');
  function nextName(curName){
    var c= curName-'0';
    if(c==4) return '5';
    c = (c+1)%5;
    return c;
  }

  