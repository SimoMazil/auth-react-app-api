import express from 'express'
import request from 'request-promise'
import {parseString} from 'xml2js'
import authenticate from '../middleware/authenticate';
import Book from '../models/Book'
import parseErrors from '../utils/parseErrors'

const router = express.Router()
router.use(authenticate)

// router.post("/", (req, res) => {
//   Book.find({userId: req.currentUser._id})
//   .then(book => res.json({book}))
// })

// router.post("/", (req, res) => {
//   Book.create({...req.body.book, userId: req.currentUser._id})
//   .then(book => res.json({book}))
//   .catch(err => res.status(400).json({errors: parseErrors(err.errors)}))
// })

router.get("/search", (req, res) => {
  request.get(`https://www.goodreads.com/search/index.xml?key=S1ROvvSssa0V1HUXoF0yg&q=${req.query.q}`).then(
    result => parseString(result, (err, goodreadsResult) => {
      if(goodreadsResult.GoodreadsResponse.search[0].results[0].work) {
        res.json({
          books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
            work => ({
              goodreadsId: work.best_book[0].id[0]._,
              title: work.best_book[0].title[0],
              authors: work.best_book[0].author[0].name[0],
              covers: [
                work.best_book[0].image_url[0]
              ]
            })
          )
        })
      } else {
        res.status(404).json({errors: {global: "Book not found"}})
      }
    })
  )
})

router.get("/fetchPages", (req, res) => {
  const goodreadsId = req.query.goodreadsId

  request.get(`https://www.goodreads.com/book/show.xml?key=S1ROvvSssa0V1HUXoF0yg&id=${goodreadsId}`).then(
    result => parseString(result, (err, goodreadsResult) => {
      const numPages = goodreadsResult.GoodreadsResponse.book[0].num_pages[0]
      const pages = numPages ? parseInt(numPages, 10) : 0
      res.json({
        pages
      })
    })
  )
})

export default router