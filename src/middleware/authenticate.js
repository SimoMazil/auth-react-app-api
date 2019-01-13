import jwt from 'jsonwebtoken'
import User from '../models/User'

export default (req, res, next) => {
  let token;
  const header = req.headers.authorization
  if(header) token = header.split(' ')[1]

  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) {
        res.status(401).json({errors: {global: "Invalid token"}})
      } else {
        // get user from decoded token and pass it to the router with next()
        User.findOne({email: decoded.email}).then(user => {
          req.currentUser = user;
          next()
        })
      }
    })
  } else {
    res.status(401).json({errors: {global: "No token"}})
  }
}