const request = require('request');
const key = require('./Keys/key.json')

const GetWeatherReport = (latitude, longitude, callback) => {
    const URL1 = "https://api.darksky.net/forecast/" + key.darksky + "/" + latitude + "," + longitude + '?units=si'
   /*  console.log(URL1); */
    
    request({url:URL1, json: true}, (error, { body } = {}) => {
        if(error){
            return callback("Unable to connect to server", undefined)
        }else if(body.error){
            return callback('Unable to fetch the latitude and longitude for given place', undefined)
        }else{
            callback(undefined, {
                latitude : body.latitude,
                longitude :body.longitude,
                timezone :body.timezone,
                Result : body.currently.summary + ' It is currently ' + 
                    body.currently.temperature + ' Degress out. There is a ' + 
                    body.currently.precipProbability + '% chance of rain.',
                WeekSummary : body.daily.summary +"."
                })
        }
    })    
}
 module.exports = GetWeatherReport