const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')


const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const utils = require('./test_util')
const { transferableAbortController } = require('node:util')

const api = supertest(app)

const testUserLst = [
  {
    _id: "5a422a851b54a676234d17f7",
    name: "Matti",
    username: "MatTire",
    passwordHash: "$2b$10$7I80km0.Vnuw3T2yQoCASuqwOfUnW3R7yNjc0azgMdrX/LLcnYTyG",
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = testUserLst
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('basic user tests', () => {  
  test('users are returned as json', async () => {
    await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  test('users can be added', async () => {
    const newUser = {
      name: "Scrible",
      username: "nextUser",
      password: "chemical coffee",
    }
    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
  })
  test('users are returned have an id field instead of _id', async () => {
    const response = await api.get('/api/users')
    response.body.map(u=> { 
        const hasId = Object.hasOwn(u, 'id')
        assert.strictEqual(hasId, true)
      }
    )
  })
})

describe('false user input, returns error', async () => {  
  const userShortUn = { name: "Scrible", username: "ne", password: "chemical coffee" }
  const userShortPw = { name: "Scrible", username: "nextUser", password: "ch" }
  const userMissingUn = { name: "Scrible", password: "chemical coffee" }
  const userMissingPw = { name: "Scrible", username: "nextUser" }

  const userDuplicate = { name: "Blaa", username: "MatTire", password: "chemical coffee" }

  const resultsArray = []

  const testArray = [
    ['too short username returns error', userShortUn  , 'username is less than 3 chars long' ],
    ['too short password returns error', userShortPw  , 'password is less than 3 chars long' ],
    ['missing username returns error'  , userMissingUn, 'username missing' ],
    ['missing password returns error'  , userMissingPw, 'password missing' ],
  ]
  
  testArray.forEach(tarr => {
    test(tarr[0], async () => { 
        const res1 = await api.post('/api/users').send(tarr[1]).expect(400) 
        assert(res1.body.error.includes(tarr[2])); 
    })
  });
  
  await test('duplicate user returns error', async () => { const res = await api.post('/api/users').send(userDuplicate).expect(400) 
    assert(res.body.error.includes('duplicate key error collection:')); 
//   console.log("res.body");
//   console.log(res.body);
  })
})

after(async () => {
  await mongoose.connection.close()
})