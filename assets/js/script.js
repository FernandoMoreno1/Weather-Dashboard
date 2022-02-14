var uv = document.getElementById("UVValues");
var cities = [];
var textEl = document.querySelector(".text");

//adds the dates to the day
function todayDate() {
    var date = document.getElementById("day1");
    date.textContent = moment().format("MM/DD/YY");
    var day = document.getElementById("day2");
    day.textContent = moment().format("MM/DD/YY");
    var day = document.getElementById("day3");
    day.textContent = moment().add(1, "d").format("MM/DD/YY");
    var day = document.getElementById("day4");
    day.textContent = moment().add(2, "d").format("MM/DD/YY");
    var day = document.getElementById("day5");
    day.textContent = moment().add(3, "d").format("MM/DD/YY");
    var day = document.getElementById("day6");
    day.textContent = moment().add(4, "d").format("MM/DD/YY");

}

function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "" + newName.value + "";

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&units=imperial&appid=e03998c5f6ae58df3ffa531950df81d5')
        .then(response => response.json())
        .then(data => {

            //Getting the min and max values for each day
            for (i = 0; i < 6; i++) {
                document.getElementById("day" + (i + 1) + "Temp").innerHTML = "Temp: " + Number(data.list[i].main.temp - 0).toFixed(1) + " °F";
            }

            for (i = 0; i < 6; i++) {
                document.getElementById("day" + (i + 1) + "wind").innerHTML = "Wind: " + Number(data.list[i].wind.speed - 0).toFixed(2) + " MPH";
            }

            for (i = 0; i < 6; i++) {
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Humidity: " + Number(data.list[i].main.humidity - 0).toFixed(3) + " %";
            }

            for (i = 0; i < 1; i++) {
                document.getElementById("day" + (i + 1) + "UV").innerHTML = "UV index: " + Number(data.list[i].main.uvi - 0).toFixed(3) + "";
            }

            //Getting Weather Icons
            for (i = 0; i < 6; i++) {
                document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
                    data.list[i].weather[0].icon
                    + ".png";
            }
            console.log(data)


        })
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "New York";
    GetInfo();
    //should save city dont know were to place
    localStorage.setItem('cityName', JSON.stringify(cities));
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}

for (i = 0; i < 6; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}


// //uv index warning colors
// if (uv.textContent >= 0 && uv.textContent < 4) {
//     uv.setAttribute("style", "background-color:rgb(7, 179, 21);");
// } else if (uv.textContent >= 4 && uv.textContent < 8) {
//     uv.setAttribute("style", "background-color:yellow;");
// } else if (uv.textContent >= 8) {
//     uv.setAttribute("style", "background-color:red;");
// }



function saveCity() {
    // document.getElementById('date').textContent = moment().format(MM/DD/YY);
    var cities = JSON.parse(localStorage.getItem("cityInput"));
    if (cities !== null) {

        for (i = 0; i < cities.length; i++) {
            var tr = document.createElement("tr");
            tr.innerHTML = cities[i];
            document.getElementById("#history").appendChild(tr);
            tr.setAttribute("class", "tr");
            var trEl = document.querySelector("#history")
            trEl.addEventListener("click", function (event) {
                textEl.value = event.target.textContent;
                document.querySelector('.city').innerHTML = textEl.value;
            })
        }
    }
}

