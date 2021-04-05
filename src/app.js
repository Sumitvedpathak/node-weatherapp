const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

const publicFolder = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//lets express know about the hbs files to look for
//by default it looks for views folder
app.set('view engine','hbs')
//let express know about custom views folder
app.set('views',viewsPath)
//lets express know about the public folder
app.use(express.static(publicFolder))

//Let hbs know where are the partial views
hbs.registerPartials(partialPath)

//route for home page
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Sumit'
    })
})
app.get('/about',(req,res)=>{
    res.render('index',{
        title: 'About',
        name: 'Sumit'
    })
})
app.get('/help',(req,res)=>{
    res.render('index',{
        title: 'Help',
        name: 'Sumit'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.addr){
        return res.send({
            error:'Please enter the address for weather report.'
        })
    }

    forecast(req.query.addr,(error, data)=>{
        if(error != undefined){
            return res.send({
                Error: 'Error fetching data for address '+ req.query.addr
            })
        }
        res.send({
            WeatherReport: data
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{msg:'No Help articles found'})
})

//For 404 pages
app.get('*',(req,res)=>{
    res.render('404',{msg:'404 - Page Not Found'})
})



app.listen(3000,()=>{
    console.log('Server Started')
})