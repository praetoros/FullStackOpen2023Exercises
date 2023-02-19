import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/'

const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY

const getWeather = (capital, countryCode) => {
    const request = axios.get(`${baseUrl}weather?q=${capital},${countryCode}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default {getWeather}
