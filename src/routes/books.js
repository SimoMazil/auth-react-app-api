import express from 'express'
import request from 'request-promise'
import {parseString} from 'xml2js'
import authenticate from '../middleware/authenticate';

const router = express.Router()
router.use(authenticate)

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

export default router