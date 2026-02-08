const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Log = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  //Blog.find({}).then((blogs) => {
  //  response.json(blogs)
  //})
  const results = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.status(200).json(results)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  //const user = await User.findById(body.userId)
  
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if(!Object.hasOwn(body, 'url')){
    response.status(400).json({ error: 'content missing' })
  } 
  else if(!Object.hasOwn(body, 'title'))
  {
    response.status(400).json({ error: 'content missing' })
  } 
  else 
  {
    //const blog = new Blog(request.body)
    const blog = new Blog( { 
      title: body.title,
      author: body.author,
      url: body.url,
      //userId: user._id
      user: user._id
    })
    
    console.log("**************");
    console.log(blog);
    console.log(user._id);
    console.log(user.id);
    if(!Object.hasOwn(blog, 'likes'))
    {
      blog.likes = 0
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

    //blog.save().then((result) => 
    //{
    //  response.status(201).json(result)
    //})
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
    
  const blog = {
    title  : body.title ,
    author : body.author,
    url    : body.url   ,
    likes  : body.likes 
  }
  //console.log(request.params.id);

  const updBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if(updBlog){
    Log.info(updBlog)
    response.status(200).json(updBlog)
  } else {
    Log.error(updBlog)
    response.status(500).json(updBlog)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  var res = await Blog.findByIdAndDelete(request.params.id)
  if(res) { 
    Log.info(res)
    response.status(204).end() 
  }
  else { 
    Log.error(res)
    response.status(500).end() 
  }
})

module.exports = blogsRouter