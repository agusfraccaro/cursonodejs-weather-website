const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWd1c2ZyYWNjYXJvIiwiYSI6ImNrdjYxZHp4ODk1YmIybnFqdDJoYzZuMncifQ.aeH79GfhO_91z3y780T4OA&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services')
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search')
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitud: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode