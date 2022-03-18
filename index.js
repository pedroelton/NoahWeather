const express = require('express')
const https = require("https")
const bodyParser = require("body-parser")
const app = express()
const port = 3300
const path = require('path')
const cityName = 'fukuoka'
const apiKey = 'be299dd32d8b1c4808f9bb6c7f82363b'

app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

app.get('/weather', (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    https.get(url, function (response) {
        // console.log(response)
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const country = weatherData.sys.country
            const city = weatherData.name
            // const sunrise = weatherData.sys.sunrise
            // const sunset = weatherData.sys.sunset
            const weatherMain = weatherData.weather[0].description
            const temp = weatherData.main.temp
            const feelsLike = weatherData.main.feels_like
            const humidity = weatherData.main.humidity
            const tempMin = weatherData.main.temp_min
            const tempMax = weatherData.main.temp_max
            const windSpeed = weatherData.wind.speed
            const windDeg = weatherData.wind.deg
            // console.log(`Hi, Pedro! In ${city}, ${country}, the weather is ${weatherMain}. The temperature is ${temp} but it feels like ${feelsLike}, with minimum of ${tempMin} and maximum of ${tempMax}, the humidity is ${humidity}% and with a wind coming from ${windDeg}deg at ${windSpeed}kt.`)
            res.render("weather", {country, city, weatherMain, temp, feelsLike, humidity, tempMin, tempMax, windSpeed, windDeg})
        })
    })
})

app.listen(port, () => {
    console.log(`Server running in the port ${port}`)
})