const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require(path.join(__dirname, 'utils/geocode.js'))
const forecast = require(path.join(__dirname, 'utils/forecast.js'))

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Agustina Fraccaro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Agustina Fraccaro'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Agustina Fraccaro',
        text: 'This is the help I will give you'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Agus',
        message: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Agus',
        message: 'Page not found.'
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})