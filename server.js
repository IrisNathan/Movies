const express = require('express');
const app = express();
const $fetch = require('node-fetch');

const PORT = process.env.PORT || 3000;
const {CONFIG} = require('./config')

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.get('/search', (req, res)=>{
    const endpoint = `https://api.themoviedb.org/3`;
    const apiKey =`api_key=${CONFIG.TMDB_KEY}`;
    let url = `${endpoint}/movie/now_playing?${apiKey}`
    
    $fetch(url)
    .then(response => {
        if(!response.ok){
            throw Error(response.statusText);
        }
         return response.json()
    }) 
    .then(data => res.render('results.ejs', {data: data.results}))     
    .catch(error => console.error("Error from the network: ", error));
    
});

app.listen(PORT, ()=>console.log(`App is listening on Port ${PORT}.`));