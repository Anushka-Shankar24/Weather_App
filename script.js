const apiKey = "PASTE_YOUR_REAL_API_KEY_HERE";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");


// Search Button Click
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    getWeather(city);

});


// Enter Key Search
cityInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        const city = cityInput.value.trim();

        if(city === ""){
            alert("Please enter city name");
            return;
        }

        getWeather(city);
    }

});



// Weather Function
async function getWeather(city){

    try{

        const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);

        const data = await response.json();

        console.log(data);


        // Invalid City or API Error
        if(data.cod != 200){

            alert(data.message);

            return;
        }


        // Temperature
        document.getElementById("temperature").innerHTML =
        Math.round(data.main.temp) + "°C";


        // City Name
        document.getElementById("cityName").innerHTML =
        data.name;


        // Weather Description
        document.getElementById("description").innerHTML =
        data.weather[0].description;


        // Humidity
        document.getElementById("humidity").innerHTML =
        data.main.humidity + "%";


        // Wind Speed
        document.getElementById("wind").innerHTML =
        data.wind.speed + " km/h";


        // Weather Icon
        const icon = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;



        // Background Change According To Weather
        const weatherMain = data.weather[0].main;

        if(weatherMain === "Clouds"){

            document.body.style.background =
            "linear-gradient(to right,#757f9a,#d7dde8)";
        }

        else if(weatherMain === "Clear"){

            document.body.style.background =
            "linear-gradient(to right,#fceabb,#f8b500)";
        }

        else if(weatherMain === "Rain"){

            document.body.style.background =
            "linear-gradient(to right,#4b79a1,#283e51)";
        }

        else if(weatherMain === "Snow"){

            document.body.style.background =
            "linear-gradient(to right,#e6dada,#274046)";
        }

        else{

            document.body.style.background =
            "linear-gradient(to right,#4facfe,#00f2fe)";
        }

    }

    catch(error){

        console.log(error);

        alert("Something went wrong");

    }

}