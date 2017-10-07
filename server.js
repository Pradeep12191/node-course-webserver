const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getFullyear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('unable to append log file')
        }
    })
    console.log(log);
    next();
})


app.use((req, res, next) => {
    res.render('maintainance.hbs')
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome Home'
    })
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to fetch request'
    })
})

app.listen(3000, () => {
    console.log('app listening to port 3000 ...')
})