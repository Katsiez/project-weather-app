//API KEY used for both current weather and forecast
const apiKey = "c2889b12ee617ea787319a19a98a5906"

//Current Weather variables
const currentWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Toronto,Canada&units=metric&APPID=c2889b12ee617ea787319a19a98a5906"
const city = 'Toronto, ON'
const date = document.getElementById('date')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')
const tempFeelsLike = document.getElementById('feelsLike')
const tempHigh = document.getElementById('H')
const tempLow = document.getElementById('L')
const sunrise = document.getElementById('sunriseTO')
const sunset = document.getElementById('sunsetTO')

//FUNCTION CURRENT WEATHER
const currentWeatherToday = (json) => {
    temperature.innerHTML = `${json.main.temp.toFixed(0.5)} °C`
    city.innerHTML = json.name
    date.innerHTML = new Date().toLocaleDateString('en-CA')
    description.innerHTML = json.weather[0].description.toUpperCase()
    tempFeelsLike.innerHTML = `${json.main.feels_like.toFixed(0.5)} °C`
    tempHigh.innerHTML = `${json.main.temp_max.toFixed(0.5)} °C`
    tempLow.innerHTML = `${json.main.temp_min.toFixed(0.5)} °C`

    //Sunrise in Toronto
    const sunriseToronto = new Date(json.sys.sunrise * 1000)
    const sunriseTorontoTime = sunriseToronto.toLocaleTimeString('en-CA', { timeStyle: 'short' })
    sunrise.innerHTML = sunriseTorontoTime

    //Sunset in Toronto
    const sunsetToronto = new Date(json.sys.sunset * 1000)
    const sunsetTorontoTime = sunsetToronto.toLocaleTimeString('en-CA', { timeStyle: 'short' })
    sunset.innerHTML = sunsetTorontoTime
}
//Fetch with JSON - Current Weather
fetch(currentWeatherUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        currentWeatherToday(json)
    })

// Five day forecast variables
const weatherForecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Toronto,Canada&units=metric&APPID=c2889b12ee617ea787319a19a98a5906"
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const today = new Date()
const days = today.getDay()


//Fetch with JSON - Forecast Weather
const forecastWeather = () => {
    fetch(weatherForecastUrl)
        .then(response => response.json())
        .then(data => {
            const newData = data.list.filter(item => {
                return item.dt_txt.includes('12:00')
            })
            console.log(newData)
        })
}
forecastWeather()