const testRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

function getRandomInt(max) { return Math.floor(Math.random() * max); }

function createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


testRouter.post('/reset', async (request, response) => {
  console.log('test reset');
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('db reset success');
  response.status(204).end()
})

testRouter.post('/testgenerate', async (request, response) => {
  console.log('generate bunch of blogs or something!');

  const users = await User.find({})

  for (let index = 0; index < 5; index++) {
    const  likes = getRandomInt(20)
    const b = new Blog({ 
      title: createRandomString(7),
      author: createRandomString(7),
      url: createRandomString(7) + '.com',
      user: users[0]._id,
      likes: likes
    })
    await b.save()
  }
  console.log('blogs created!');
  response.status(204).end()
})


module.exports = testRouter