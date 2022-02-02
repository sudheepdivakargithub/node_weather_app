const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set("view engine", 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', { title: "Weather App", name: "Sudheep Divakar" })
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About Me", name: "Sudheep Divakar" })
})

app.get('/help', (req, res) => {
    res.render('help', { message: "For help contact 9986766218", title: "Help", name: "Sudheep Divakar" })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address required."
        })

    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: data,
                location: location,
                address: req.query.address
            })

        })
    })


})

app.get('/help/*', (req, res) => {
    res.render("404", { title: "404", message: "Help document not found.", name: "Sudheep Divakar" })
})


app.get('*', (req, res) => {
    res.render("404", { title: "404", message: "Error. Page not found.", name: "Sudheep Divakar" })
})

app.listen(3000, () => console.log("Server is up in port 3000"))