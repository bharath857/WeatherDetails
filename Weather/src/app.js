const path = require('path');
const Coordinates = require('./utils/coordinates');
const WeatherDetails = require('./utils/WeatherDetails');
const express = require('express')
const hbs = require('hbs')

const app = express()

// paths for Express configaration 
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

// handlebars engine and views location partials
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory for express
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Created by Baymax'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Baymax is frictional chracter in Big hero 6'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Get help details'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return  res.render('404', {
            /* error: 'Please go to home page and provide the address or Latitude and Longitude in Search Bar', */
                title: '404',
                errorMessage: 'Please go to home page and provide the address or Latitude and Longitude in Search Bar or ex:-' +"/"+ 'weather?address=Bangalore'
        })
    }
    Coordinates(req.query.address, (error, CoordinatesNumbers = {}) => {
        if (error) {
            return res.send({ error })
        }
        WeatherDetails(CoordinatesNumbers.latitude, CoordinatesNumbers.longitude, (error, WeatherConditions) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                LocationSearch : CoordinatesNumbers.SearchValue,
                SearchLocation : CoordinatesNumbers.Location,
                Serachlatitude : CoordinatesNumbers.latitude,
                Searchlongitude: CoordinatesNumbers.longitude,
                SearchFor : CoordinatesNumbers.SearchValue,
                SearchLocation : CoordinatesNumbers.Location,
                Timezone : WeatherConditions.timezone,
                latitude: WeatherConditions.latitude,
                longitude: WeatherConditions.longitude,

                Result: WeatherConditions.Result,
                WeekSummary : WeatherConditions.WeekSummary
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: '',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})