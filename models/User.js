const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { ObjectId } = mongoose.Schema.Types


const userSchema = new mongoose.Schema({
    username: {
       type: String,
       required: true,
       unique: true
    },
    password: {
       type: String,
       required: true
    }
})


const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    }
})

userSchema.statics.signUp = async function (username, password) {
    const user = new this()
    user.username = username
    await user.hashPassword(password)
    await user.save()
    return user
  }

userSchema.methods.hashPassword = function (plainText) {
    const user = this
    return bcrypt.hash(plainText, 10).then(hash => {
        user.password = hash
    })
  }
  
  userSchema.methods.comparePassword = function (password) {
      return bcrypt.compare(password, this.password)
  }
  
  
//   module.exports = User
  