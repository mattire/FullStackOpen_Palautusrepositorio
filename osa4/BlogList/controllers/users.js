const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const results = await User.find({})
  response.status(200).json(results)
})


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  let failed = false;
  
  // check if username of password is missing or less than 3 chars long
  [["username", username], ["password", password]].forEach(element => {
      if(element[1] == null){ 
          console.log(`NULL ${element[0]}`);
          response.status(400).json({ error: `${element[0]} missing`}) 
          failed = true; }
          else if(element[1].length < 3) {
              response.status(400).json({ error: `${element[0]} is less than 3 chars long`}) 
              failed = true;}
            });
            
    if(!failed){
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const user = new User({
          username,
          name,
          passwordHash,
        })
        
        const savedUser = await user.save()
        
        response.status(201).json(savedUser)
  }
})

module.exports = usersRouter