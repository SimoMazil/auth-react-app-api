import express from 'express'
import authenticate from '../middleware/authenticate';

const router = express.Router()
router.use(authenticate)

router.get("/search", (req, res) => {
  res.json({
    books: [
      {
        goodreadsId: 1,
        title: 'Dead Like You',
        authors: 'Peter James',
        covers: [
          'https://images.gr-assets.com/books/1437326528l/8334881.jpg',
          'https://images.gr-assets.com/books/1434397666l/25732930.jpg'
        ],
        pages: 560
      },
      {
        goodreadsId: 2,
        title: 'Not Dead Yet',
        authors: 'Peter James',
        covers: [
          'https://images.gr-assets.com/books/1333199674l/13538698.jpg'
        ],
        pages: 448
      }
    ]
  })
})

export default router