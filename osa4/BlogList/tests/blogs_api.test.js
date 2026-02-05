const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
//const helper = require('./initialBlogs')
const utils = require('./test_util')

const api = supertest(app)

const testBlogLst = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
    }  ]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = testBlogLst
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})


describe('returning blogs', () => {  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('right amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
  })
  
  test('blogs are returned have an id field instead of _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(b=> { 
        const hasId = Object.hasOwn(b, 'id')
        assert.strictEqual(hasId, true)
      }
    )
  })
})


test('blogs can be added', async () => {
  const newBlog = {
        title: 'Grand Central Train Station',
        author: 'Erin Brockovich',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/grand_central.html',
        likes: 15,
      }
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  var db_blogs = await utils.blogsInDb()
  var titles = db_blogs.map(b=>b.title)
  
  assert(titles.includes('Grand Central Train Station'))
})

describe('blogs editing and deleting', () => { 
  test('blogs can be edited', async () => {  
    const blogsAtStart = await utils.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedTitle = 'Updated title !!!'
    const updatedBlog = {
      title : updatedTitle,
      author:blogToUpdate.author + 'upd',
      url   :blogToUpdate.url    + 'upd',
      likes :blogToUpdate.likes+=1
    }
    console.log('updating blog', blogToUpdate.id);
    const url = `/api/blogs/${blogToUpdate.id}`
    console.log(url);
    const res = await api.put(url).send(updatedBlog).expect(200).expect('Content-Type', /application\/json/)
    const blogsAtEnd = await utils.blogsInDb()
    const titles = blogsAtEnd.map(b=>b.title)
    assert(titles.includes(updatedTitle))      
  })

  test('blogs can be deleted', async () => {  
    const blogsAtStart = await utils.blogsInDb()
    const blogToDel = blogsAtStart[0]
    const url = `/api/blogs/${blogToDel.id}`
    console.log(url);
    try {
      await api.delete(url).expect(204)
      const blogsAtEnd = await utils.blogsInDb()
      const ids = blogsAtEnd.map(b=>b.id)
      assert(!ids.includes(blogToDel.id))      
    } catch (error) {
      console.log(error);
    }
  })
 })

after(async () => {
  await mongoose.connection.close()
})