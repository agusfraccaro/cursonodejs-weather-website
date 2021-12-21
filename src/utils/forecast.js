const request = require('request')

forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ad7890be56721a4a6a3f8f4303ad7d37&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services.')
        }else if(body.error){
            callback('Unable to find location.')
        }else{
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast