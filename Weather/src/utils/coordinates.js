const request = require('request');
const key = require('./Keys/key.json')

const GetCoordinates = (Address, callback) => {
        
    const URL1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + Address + ".json?access_token=" + key.MapRoute +"&limit=1"
   /*  console.log(URL1); */
    request({url:URL1, json: true}, (error, { body } = {}) => {
        
        if(error){
            return callback('Unable to connect to location services!', undefined)
        }else if(body.features.length === 0) {
            return callback('Unable to find location. Try another search.', undefined)
        }else
            callback(undefined, {
                SearchValue : body.query,
                Location : body.features[0].place_name,
                latitude : body.features[0].geometry.coordinates[1],
                longitude : body.features[0].geometry.coordinates[0]
             
        })  
    })
}

module.exports = GetCoordinates