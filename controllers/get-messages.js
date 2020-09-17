const express = require('express')
const fs = require('fs')
const Messages = require('../models/Messages')

const router = express.Router()


router.get('/messages', (req, res) => {
    // fs.readFile('./messages.txt', 'utf8', (err, text) => {
    //   if (err) return res.status(500).send(err)
    //   const messages = text
    //     .split('\n')
    //     .filter(txt => txt) // will filter out empty string
    //     .map(JSON.parse)
    //     console.log("THIS IS YOUR MESSAGES FROM THE BACK END")
    //     console.log(messages)
    //   return res.json(messages)
    // })
    Messages.find({}).populate('user', 'username').exec((err, messages) => {
      if (err) return res.status(500).send(err)
      console.log(messages)
      return res.json(messages)
    })    
})

  module.exports = router

// router.post('/messages', (req, res) => {
//   User.findOne({ username: req.body.username }, async (err, userExists) => {
//     if (err) return res.status(500).send({error: err})
//     if (userExists) return res.status(400).send({error: 'username already exists'})

//     const user = await User.signUp(req.body.username, req.body.password)
//     res.status(201).send(user.sanitize())
//   })
// })