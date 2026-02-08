require('dotenv').config()

let PORT = process.env.PORT
//let MONGODB_URI = process.env.MONGODB_URI
let MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
let TEST_PASSWORD = process.env.TEST_PASSWORD

module.exports = { MONGODB_URI, PORT, TEST_PASSWORD }