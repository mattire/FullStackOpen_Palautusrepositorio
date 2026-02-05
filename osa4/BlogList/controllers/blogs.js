const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Log = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  console.log(body);
  
  const blog = {
    title  : body.title ,
    author : body.author,
    url    : body.url   ,
    likes  : body.likes 
  }
  console.log(request.params.id);

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