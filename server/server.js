const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 4000
var bodyParser = require('body-parser')
const { forEach } = require('methods')

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(bodyParser.json())
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


mongoose.connect('mmongodb+srv://cagatayKaban:KENA0AZBHA6PWyca@recipe.svorc.mongodb.net/FilmApp?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})


const { Schema } = mongoose;

const filmSchema = new Schema({
    name: String,
    genres: [],
    imgUrl: String,
    minutes: Number,
    publishedYear : Number,
    rate: Number
})

const genreSchema = new Schema({
    name: String
})

const film = mongoose.model('film', filmSchema)
const genre = mongoose.model('genre', genreSchema)

app.get('/films', (req, res) => {
    film.find({}, (err,docs) => {
        res.json(docs)
    })
})

app.get('/genres', (req, res) => {
    genre.find({}, (err,docs) => {
        res.json(docs)
    })
})

app.get('/film/:id', (req, res) => {
    let id =req.params.id;
    film.findById(id,(err,doc)=>{
      if (doc != null) {
          res.json(doc)
      }else{
          res.status(400).json({'mesaj': 'Bulunamadı!'})
      }
    })
  })

  app.post('/addFilm', function (req, res) {
    let newFilm = new film({
        name: req.body.name,
        minutes: req.body.minutes,
        genres : req.body.genres,
        imgUrl : req.body.imgUrl,
        rate : req.body.rate
    })
    newFilm.save((err,doc)=>{
        if (!err) {
            res.json(doc)
        }else{
            res.json(err)
        }
    })
  })

  app.post('/updateFilm/:id', (req, res) => {
    let id = req.params.id;
    film.findById(id, (err,doc) => {
        console.log(doc);
        if (doc != null) {
            doc.name = req.body.name
            doc.save((err,doc)=> {
                if (!err) {
                    res.json(doc)
                    console.log(doc);
                }else{
                    res.json(err)
                }
            })
            
        }
        else{
            res.status(404)
        }
    })
  })

  app.post('/deleteFilm', function (req, res) {
    let id = req.body._id
    film.deleteOne({_id:id},(err,doc)=>{
      if(doc !=null){
          if(!err){
              res.json(doc);
          }
          else{
              res.json(err);
          }
      }
      else{
          res.status(404).json({"msg":"Silinecek ürün bulunamadı"});
      }
    })
  })



//   film.findById('602ed29f2120f40fc2cdaac5', (err,doc) => {
//     doc.rate = 4.0
//     doc.minutes = 126
//     doc.save()
// })

// "genres": [
//     "Comedy",
//     "Fantasy",
//     "Crime",
//     "Drama",
//     "Music",
//     "Adventure",
//     "History",
//     "Thriller",
//     "Animation",
//     "Family",
//     "Mystery",
//     "Biography",
//     "Action",
//     "Film-Noir",
//     "Romance",
//     "Sci-Fi",
//     "War",
//     "Western",
//     "Horror",
//     "Musical",
//     "Sport"
// ],
// var newGenre = new genre({
//     name: 'Sport'
// })
// newGenre.save()
// var newFilm = new film({
//     name: 'Spider-man Home Coming',
//     publishedDate: 2017,
//     minutes: 133,

// })
// newFilm.save()


